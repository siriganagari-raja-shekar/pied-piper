import React from 'react'
import { Stack, Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import './UpcomingAppointments.scss'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../../../../services/utils'
import profile from '../../../../Assets/Images/profilejpg.png'
import { useState } from 'react'
import VideoChat from '../../../twilio/VideoChat'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


const UpcomingAppointment = ({ appointment, videoCallModalDisplay, setVideoCallModalDisplay, setVideoAppointmentId }) => {
    const navigate = useNavigate();
    return (
        <Stack key={appointment.id} direction='vertical' className='appointment'>
            <span className="backgroundClock"><FontAwesomeIcon icon={faClock} /></span>
            <Stack direction='horizontal' className='justify-content-between'>
                {appointment.appointmentType === 'video' &&
                    <p>Video consultation</p>
                }
                {appointment.appointmentType === 'in-person' &&
                    <p>In person consultation</p>
                }
                <span onClick={()=> navigate(`/patient/manageAppointment/${appointment.id}`)}><FontAwesomeIcon icon={faEye} /></span>
            </Stack>
            <h5>{formatDate(appointment.time, "MMM Do YYYY, h:mm A")}</h5>
            <Stack direction='horizontal' className='assignedDoctor'>
                <img src={profile} alt='profile' />
                <Stack className='doctorDetails'>
                    <h5>{appointment.doctor.name}</h5>
                    <p>{appointment.doctor.specialization}</p>
                </Stack>
            </Stack>
            {
                appointment.appointmentType === 'video' &&
                <Button onClick={() => {
                    setVideoCallModalDisplay(!videoCallModalDisplay)
                    setVideoAppointmentId(appointment.id)
                }}>Connect to call</Button>
            }
        </Stack>
    )
}

const UpcomingAppointments = ({ appointments }) => {
    let count = 0
    const [lgShow, setLgShow] = useState(false);
    const [videoCallModalDisplay, setVideoCallModalDisplay] = useState(false);
    const [videoAppointmentId, setVideoAppointmentId] = useState(null)

    const onClickHandler = () => {

    }

    return (
        <>
            <Stack direction='vertical' id='upcomingAppointments' gap={3}>
                <Stack direction='horizontal' id='title'>
                    <span className="logo"><FontAwesomeIcon icon={faClock} /></span>
                    <h2>Upcoming Appointments</h2>
                </Stack>
                {
                    appointments.map((appointment) => {
                        count++
                        if (count <= 2) {
                            return (
                                <UpcomingAppointment
                                    key={appointment.id}
                                    appointment={appointment}
                                    videoCallModalDisplay={videoCallModalDisplay}
                                    setVideoCallModalDisplay={setVideoCallModalDisplay}
                                    setVideoAppointmentId={setVideoAppointmentId}
                                />
                            )
                        }
                    })
                }

                <NavLink className='viewmore' onClick={() => setLgShow(true)}>View more</NavLink>
            </Stack>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="Prescriptions"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Prescriptions">All upcoming appointments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap={3}>
                        {
                            appointments.map((appointment) => {
                                return (
                                    <UpcomingAppointment key={appointment.id} appointment={appointment} videoCallModalDisplay={videoCallModalDisplay} setVideoCallModalDisplay={setVideoCallModalDisplay} />
                                )
                            })
                        }
                    </Stack>
                </Modal.Body>
            </Modal>
            <Modal
                size="xl"
                show={videoCallModalDisplay}
                onHide={() => setVideoCallModalDisplay(false)}
                aria-labelledby="Video consultation"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Twilio-video-call">Video consultation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical'>
                        <VideoChat appointment={videoAppointmentId}/>
                    </Stack>
                </Modal.Body>
            </Modal>                   
        </>
    )
}

export default UpcomingAppointments