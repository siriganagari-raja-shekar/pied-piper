import React, { useEffect } from 'react'
import { useState } from 'react'
import { Stack, Button, Modal, NavLink } from 'react-bootstrap'
import ProfilePic from '../../../Assets/Images/profilejpg.png'
import { getNextAppointmentByDoctorId, getTodaysAppointmentsByDoctorID } from '../../../services/appointmentsService'
import { getStoredUser } from '../../../services/authService'
import VideoChat from '../../twilio/VideoChat'
import { formatDate } from '../../../services/utils'
import './NextPatient.scss'
import { getUserFromLocalStorage } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';

const NextPatient = () => {
    const [videoCallModalDisplay, setVideoCallModalDisplay] = useState(false);
    const [nextAppointment, setNextAppointment] = useState(null);
    const navigate = useNavigate();

    const populate = async () => {
        const user = getUserFromLocalStorage();
        const appointments = await getTodaysAppointmentsByDoctorID(user.id);
        if(appointments){
            const now = new Date();
            const upcomingAppointments = appointments.filter(appointment => new Date(appointment.time) > now);
            upcomingAppointments.sort((a,b) => new Date(a.time) < new Date(b.time) ? -1 : 1);
            setNextAppointment(upcomingAppointments[0]);
        }
    }

    useEffect(() => {
        populate();
    },[])

    return (
        <>
            <Stack id="next-patient-container" direction='vertical' gap={3}>
                <Stack direction='horizontal' id='title'>
                    <h3>Next patient</h3>
                </Stack>
                {
                nextAppointment 
                ?
                <>
                    <Stack id="next-patient-profile" direction='horizontal' gap={3} className='flex-wrap'>
                        <img src={ProfilePic} alt="profile" />
                        <Stack className='justify-content-center'>
                            <h4 className='m-0'>{nextAppointment.patient.name}</h4>
                            <p className='m-0'>{nextAppointment.patient.address.streetAddress}</p>
                            <p className='m-0'>{nextAppointment.patient.address.city}</p>
                        </Stack>
                        <Stack direction="vertical" className='justify-content-around'>
                            <Button onClick={() => setVideoCallModalDisplay(!videoCallModalDisplay)}>Connect to call</Button>
                            <Button onClick={()=> navigate(`/doctor/manageAppointment/${nextAppointment.id}`)}>
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
                </>
                :
                    <h4>You are done for the day!</h4>
                }
            </Stack>
            {
                nextAppointment 
                &&
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