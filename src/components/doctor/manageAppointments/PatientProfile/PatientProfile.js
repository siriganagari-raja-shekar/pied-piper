import React from 'react'
import { useState, useEffect } from 'react'
import { getAppointmentById } from '../../../../services/appointmentsService'
import './PatientProfile.scss'
import { Stack, Modal, Button } from 'react-bootstrap'
import ProfilePic from '../../../../Assets/Images/profilejpg.jpg'
import { formatDate } from '../../../../services/utils'
import VideoChat from '../../../twilio/VideoChat'

const PatientProfile = ({ appointmentId }) => {
  const [appointment, setAppointment] = useState({})
  const [videoCallModalDisplay, setVideoCallModalDisplay] = useState(false);

  const populateData = async () => {
    const getAppointment = await getAppointmentById(appointmentId)
    setAppointment(getAppointment)
  }

  useEffect(() => {
    populateData()
  }, [])

  return (
    <>
    { appointment.patient &&
    <Stack id="next-patient-container" direction='vertical' gap={3}>
      <Stack direction='horizontal' id='title'>
        <h3>Next patient</h3>
      </Stack>
      <Stack id="next-patient-profile" direction='horizontal' gap={3} className='flex-wrap'>
        <img src={ProfilePic} alt="profile" />
        <Stack className='justify-content-center'>
          <h4 className='m-0'>{appointment.patient.name}</h4>
          <p className='m-0'>{appointment.patient.address.streetAddress}</p>
          <p className='m-0'>{appointment.patient.address.city}</p>
        </Stack>
        <Stack direction="vertical" className='justify-content-around'>
          <Button onClick={() => setVideoCallModalDisplay(!videoCallModalDisplay)}>Connect to call</Button>
        </Stack>
      </Stack>
      <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
        <div>
          <p><b>Birth Date</b></p>
          <p className="value">{formatDate(appointment.patient.dateOfBirth, "Do MMM, YYYY")}</p>
        </div>
        <div>
          <p><b>SEX</b></p>
          <p className="value">{appointment.patient.sex}</p>
        </div>
        <div>
          <p><b>Weight</b></p>
          <p className="value">{appointment.patient.weight} kg</p>
        </div>
      </Stack>
      <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
        <div>
          <p><b>Height</b></p>
          <p className="value">{appointment.patient.height} cm</p>
        </div>
        <div>
          <p><b>Last appointment</b></p>
          <p className="value">1st Dec 2022</p>
        </div>
        <div>
          <p><b>Membership</b></p>
          <p className="value">{appointment.patient.subscription}</p>
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
    {appointment &&
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
                            <VideoChat appointment={appointment.id} />
                        </Stack>
                    </Modal.Body>
                </Modal>
            }
    </>
  )
}

export default PatientProfile