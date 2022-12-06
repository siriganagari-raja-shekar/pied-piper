import React, { useEffect } from 'react'
import { useState } from 'react'
import { Stack, Button, Modal } from 'react-bootstrap'
import ProfilePic from '../../../Assets/Images/profilejpg.jpg'
import { getNextAppointmentByDoctorId } from '../../../services/appointmentsService'
import { getStoredUser } from '../../../services/authService'
import VideoChat from '../../twilio/VideoChat'
import './NextPatient.scss'

const NextPatient = () => {
    const [videoCallModalDisplay, setVideoCallModalDisplay]= useState(false);
    const [nextAppointment, setNextAppointment] = useState({})

    const populate= async ()=>{
        const doctor= getStoredUser()
        const appointment = await getNextAppointmentByDoctorId(doctor.id)
        setNextAppointment(appointment)
    }

    useEffect(()=>{
        populate()
    }, [])
    return (
        <>
            <Stack id="next-patient-container" direction='vertical' gap={3}>
                <Stack direction='horizontal' id='title'>
                    <h3>Next patient</h3>
                </Stack>
                <Stack id="next-patient-profile" direction='horizontal' gap={3} className='flex-wrap'>
                    <img src={ProfilePic} alt="profile" />
                    <Stack className='justify-content-center'>
                        <h4 className='m-0'>Manav Malavia</h4>
                        <p className='m-0'>231 Park Drive</p>
                        <p className='m-0'>Boston, MA</p>
                    </Stack>
                    <Stack direction="vertical" className='justify-content-around'>
                        <Button onClick={()=> setVideoCallModalDisplay(!videoCallModalDisplay)}>Connect to call</Button>
                        <Button>View profile</Button>
                    </Stack>
                </Stack>
                <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
                    <div>
                        <p><b>D.O.B</b></p>
                        <p className="value">1st Dec 1998</p>
                    </div>
                    <div>
                        <p><b>SEX</b></p>
                        <p className="value">Other</p>
                    </div>
                    <div>
                        <p><b>Weight</b></p>
                        <p className="value">69 kg</p>
                    </div>
                </Stack>
                <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
                    <div>
                        <p><b>Height</b></p>
                        <p className="value">169 cm</p>
                    </div>
                    <div>
                        <p><b>Last appointment</b></p>
                        <p className="value">1st Dec 2022</p>
                    </div>
                    <div>
                        <p><b>Membership</b></p>
                        <p className="value">Gold</p>
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
                        <VideoChat appointment={nextAppointment.id}/>
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NextPatient