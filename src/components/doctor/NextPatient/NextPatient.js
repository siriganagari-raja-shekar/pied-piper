import React, { useEffect } from 'react'
import { useState } from 'react'
import { Stack, Button, Modal, NavLink } from 'react-bootstrap'
import ProfilePic from '../../../Assets/Images/profilejpg.jpg'
import { getNextAppointmentByDoctorId } from '../../../services/appointmentsService'
import { getStoredUser } from '../../../services/authService'
import VideoChat from '../../twilio/VideoChat'
import { formatDate } from '../../../services/utils'
import './NextPatient.scss'

const NextPatient = () => {
    const [videoCallModalDisplay, setVideoCallModalDisplay] = useState(false);
    const [nextAppointment, setNextAppointment] = useState(null)

    const populate = async () => {
        const doctor = getStoredUser()
        const appointment = await getNextAppointmentByDoctorId(doctor.id)
        //console.log(appointment)
        setNextAppointment(appointment)
    }

    useEffect(() => {
        populate()
    }, [])

    return (
        <>
            {nextAppointment &&
                <Stack id="next-patient-container" direction='vertical' gap={3}>
                    <Stack direction='horizontal' id='title'>
                        <h3>Next patient</h3>
                    </Stack>
                    <Stack id="next-patient-profile" direction='horizontal' gap={3} className='flex-wrap'>
                        <img src={ProfilePic} alt="profile" />
                        <Stack className='justify-content-center'>
                            <h4 className='m-0'>{nextAppointment.patient.name}</h4>
                            <p className='m-0'>{nextAppointment.patient.address.streetAddress}</p>
                            <p className='m-0'>{nextAppointment.patient.address.city}</p>
                        </Stack>
                        <Stack direction="vertical" className='justify-content-around'>
                            <Button onClick={() => setVideoCallModalDisplay(!videoCallModalDisplay)}>Connect to call</Button>
                            <Button>
                                <NavLink >Open appointment</NavLink>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
                        <div>
                            <p><b>Birth Date</b></p>
                            <p className="value">{formatDate(nextAppointment.patient.dateOfBirth, "Do MMM, YYYY")}</p>
                        </div>
                        <div>
                            <p><b>Sex</b></p>
                            <p className="value">{nextAppointment.patient.sex}</p>
                        </div>
                        <div>
                            <p><b>Weight</b></p>
                            <p className="value">{nextAppointment.patient.weight} kg</p>
                        </div>
                    </Stack>
                    <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
                        <div>
                            <p><b>Height</b></p>
                            <p className="value">{nextAppointment.patient.height} cm</p>
                        </div>
                        <div>
                            <p><b>Last appointment</b></p>
                            <p className="value">1st Dec 2022</p>
                        </div>
                        <div>
                            <p><b>Membership</b></p>
                            <p className="value">{nextAppointment.patient.subscription}</p>
                        </div>
                    </Stack>
                    <Stack
                        id="patient-diagnosis"
                        className="flex-wrap"
                        direction='horizontal'
                        gap={3}>
                        <b>Previous diagnosis:</b>
                        <span>Fever</span>
                        <span>HIV</span>
                        <span>AIDS</span>
                        <span>Loose motions</span>
                    </Stack>
                </Stack>
            }
            {nextAppointment &&
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
                            <VideoChat appointment={nextAppointment.id} />
                        </Stack>
                    </Modal.Body>
                </Modal>
            }
        </>

    )
}

export default NextPatient