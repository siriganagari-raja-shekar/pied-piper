import React from 'react'
import { Stack, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../../../services/utils'
import profile from '../../../Assets/Images/profilejpg.jpg'
import { useState } from 'react'
import VideoChat from '../../twilio/VideoChat'
import './PatientAppointmentHistory.scss'

const Appointment = ({appointment, type}) => {
    const navigate = useNavigate()
    return (
        <Stack
            className="appointments"
            direction="horizontal"
            gap={3}
            onClick={(e) => {
                navigate(`/patient/manageAppointment/${appointment.id}`)
            }}
        >
            <Stack direction="horizontal" className='justify-content-between container-fluid'>
                <Stack direction="horizontal" gap={3}>
                    <img src={profile} alt="profile" style={{ width: "60px", height: '60px', borderRadius: '50%' }} />
                    <Stack direction="vertical" className='justify-content-center'>
                        <p id="username"><b>{appointment.patient.name}</b></p>
                        <p>Male, {"Age: " + (new Date().getFullYear() - new Date(appointment.patient.dateOfBirth).getFullYear())} </p>
                    </Stack>
                </Stack>
                <Stack direction="vertical" className='align-items-end justify-content-center flex-grow-0'>
                    {appointment.appointmentType === 'in-person' &&
                        <p><b>In person</b></p>
                    }
                    {appointment.appointmentType === 'video' &&
                        <p><b>Video</b></p>
                    }
                    {type === '1' &&
                        <p>{formatDate(appointment.time, "Do MMM YY, h:mm A")}</p>
                    }
                    {type === '2' &&
                        <p>{formatDate(appointment.time, "Do MMM YY, h:mm A")}</p>
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}

const PatientAppointmentHistory = ({ appointments, limit, type, title }) => {
    let count = 0
    const [lgShow, setLgShow] = useState(false);
    const [videoCallModalDisplay, setVideoCallModalDisplay] = useState(false);

    return (
        <>
            <Stack direction='vertical' id='upcomingAppointments' gap={4}>
                <Stack direction='horizontal' id='title'>
                    <h3>{title}</h3>
                </Stack>
                <Stack direction='vertical' gap={3}>
                    {
                        appointments.map((appointment) => {
                            count++
                            if (count <= limit) {
                                return (
                                    <Appointment
                                        key={appointment.id}
                                        appointment={appointment}
                                        videoCallModalDisplay={videoCallModalDisplay}
                                        setVideoCallModalDisplay={setVideoCallModalDisplay}
                                        type={type}
                                    />
                                )
                            }
                        })
                    }
                </Stack>
                {type === '1' &&
                    <NavLink className='viewmore' onClick={() => setLgShow(true)}>View more</NavLink>
                }
            </Stack>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="Prescriptions"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Prescriptions">
                        <h2>Today's appointments</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap={3}>
                        {
                            appointments.map((appointment) => {
                                return (
                                    <Appointment
                                        key={appointment.id}
                                        appointment={appointment}
                                        videoCallModalDisplay={videoCallModalDisplay}
                                        setVideoCallModalDisplay={setVideoCallModalDisplay}
                                    />
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

export default PatientAppointmentHistory