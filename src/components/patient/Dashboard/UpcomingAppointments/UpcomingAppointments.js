import React from 'react'
import { Stack, Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import './UpcomingAppointments.scss'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../../../../services/utils'
import profile from '../../../../Assets/Images/profilejpg.jpg'
import { useState } from 'react'
import VideoChat from '../../../twilio/VideoChat'


const UpcomingAppointment = ({ appointment, videoCallModalDisplay, setVideoCallModalDisplay }) => {
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
                <span>...</span>
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
                <Button onClick={()=> setVideoCallModalDisplay(!videoCallModalDisplay)}>Connect to call</Button>
            }
        </Stack>
    )
}

const UpcomingAppointments = ({ appointments }) => {
    let count = 0
    const [lgShow, setLgShow] = useState(false);
    const [videoCallModalDisplay, setVideoCallModalDisplay]= useState(false);

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
                                <UpcomingAppointment key={appointment.id} appointment={appointment} videoCallModalDisplay={videoCallModalDisplay} setVideoCallModalDisplay={setVideoCallModalDisplay} />
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
                                    <UpcomingAppointment key={appointment.id} appointment={appointment} videoCallModalDisplay={videoCallModalDisplay} setVideoCallModalDisplay={setVideoCallModalDisplay}/>
                                )
                            })
                        }
                    </Stack>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={videoCallModalDisplay}
                onHide={() => setVideoCallModalDisplay(false)}
                aria-labelledby="Twillio video Call"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Twilio video call">Twilio Video Call</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical'>
                        <VideoChat />
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpcomingAppointments