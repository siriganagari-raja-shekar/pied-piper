import React from 'react'
import { useState, useEffect } from 'react'
import { getAppointmentById, updateVitals } from '../../../../services/appointmentsService'
import './PatientProfileAppointment.scss'
import { Stack, Modal, Button, Form } from 'react-bootstrap'
import ProfilePic from '../../../../Assets/Images/profilejpg.jpg'
import { formatDate } from '../../../../services/utils'
import VideoChat from '../../../twilio/VideoChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faLungs } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { getUserFromLocalStorage } from '../../../../services/userService'


const PatientProfileAppointment = ({ appointmentId, displayHeading}) => {
  const [appointment, setAppointment] = useState({})
  const [videoCallModalDisplay, setVideoCallModalDisplay] = useState(false);
  const [inputVisible, setInputVisible] = useState(false)
  const [validated, setValidated] = useState(false);
  const user = getUserFromLocalStorage();

  const populateData = async () => {
    const getAppointment = await getAppointmentById(appointmentId)
    setAppointment(getAppointment)
  }

  const handleSubmit = async (event)=>{
    const form = event.target;
    event.preventDefault();
    event.stopPropagation();
    if(!form.checkValidity()){
      setValidated(false);
    }
    else{
      console.log("Form validated");
      const vitals = {
        bloodPressure: document.querySelector("#bloodPressure").value.trim(),
        pulse: document.querySelector("#pulse").value.trim(),
        bloodOxygenLevel: document.querySelector("#bloodOxygenLevel").value.trim(),
        temperature: document.querySelector("#temperature").value.trim()
      }
      const updatedAppointment = await updateVitals(appointment.id, vitals);
      setAppointment(updatedAppointment);
      setInputVisible(false);
    }

    setValidated(true);
  }

  useEffect(() => {
    populateData()
  }, [])

  return (
    <>
    { appointment.patient &&
    <Stack id="next-patient-container" direction='vertical' gap={3}>
      {
        displayHeading
        &&
        <Stack direction='horizontal' id='title'>
          <h3>Next patient</h3>
        </Stack>
      }
      
      <Stack id="next-patient-profile" direction='horizontal' gap={3} className='flex-wrap'>
        <img src={ProfilePic} alt="profile" />
        <Stack className='justify-content-center'>
          <h4 className='m-0'>{appointment.patient.name}</h4>
          <p className='m-0'>{appointment.patient.address.streetAddress}</p>
          <p className='m-0'>{appointment.patient.address.city}</p>
        </Stack>
        <Stack direction="vertical" className='justify-content-around'>
          { new Date(appointment.time) > new Date() && <Button onClick={() => setVideoCallModalDisplay(!videoCallModalDisplay)}>Connect to call</Button>}
        </Stack>
      </Stack>
      <Stack className="patient-details justify-content-between" direction='horizontal' gap={3}>
        <div>
          <p><b>Birth Date</b></p>
          <p className="value">{formatDate(appointment.patient.dateOfBirth, "Do MMM, YYYY")}</p>
        </div>
        <div>
          <p><b>Sex</b></p>
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
      <Stack direction="vertical" gap={2}>
        <b>Vitals: </b>
        <Stack direction='horizontal' className='justify-content-between align-items-center'>
          <Stack direction='horizontal' gap={1}>
            <span>
            <FontAwesomeIcon icon={faHeartPulse}/>
            </span>
              <>
                <b>{appointment.vitals ?  appointment.vitals.pulse : "-"}&nbsp;bpm</b>
              </>
          </Stack>
          <Stack direction='horizontal' gap={1}>
              <span>
              <FontAwesomeIcon icon={faTemperatureHalf}/>
              </span>
                <b>{appointment.vitals ?  appointment.vitals.temperature : "-"}&nbsp;&#8457;</b>     
          </Stack>
          <Stack direction='horizontal' gap={1}>
                <span>
                <FontAwesomeIcon icon={faDroplet}/>
                </span>
                  <b>{appointment.vitals ?  appointment.vitals.bloodPressure : "-"}</b>
              
          </Stack>
          <Stack direction='horizontal' gap={1}>
              <span>
              <FontAwesomeIcon icon={faLungs}/>
              </span>
              <b>{appointment.vitals ?  appointment.vitals.bloodOxygenLevel : "-"}&nbsp;%</b>
          </Stack>
          {
            user.role === "doctor"
            &&
            <span className='align-self-end'>
              <FontAwesomeIcon icon={faPencil} onClick={()=> setInputVisible(true)}/>
            </span>
          }
          
        </Stack>
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
      {
        <Modal
          size="lg"
          show={inputVisible}
          onHide={() => setInputVisible(false)}
          aria-labelledby="Update vitals"
        >
          <Modal.Header closeButton>
              <Modal.Title>Update vitals</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-1 form-individual-group">
                    <Form.Label>Heart rate</Form.Label>
                    <Form.Control type="text" placeholder="Enter heart rate" name="pulse" id="pulse" required pattern={"^\\d{2,3}$"}/>
                  </Form.Group>
                  <Form.Group className="mb-1 form-individual-group">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Enter temperature" name="temperature" id="temperature" required pattern={"^\\d{2,3}.?\\d{0,2}$"}/>
                  </Form.Group>
                  <Form.Group className="mb-1 form-individual-group">
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control type="text" placeholder="Enter blood pressure" name="bloodPressure" id="bloodPressure" required pattern={"^\\d{2,3}/\\d{2,3}$"}/>
                  </Form.Group>
                  <Form.Group className="mb-2 form-individual-group">
                    <Form.Label>Blood Oxygen Level</Form.Label>
                    <Form.Control type="text" placeholder="Enter blood oxygen level" name="bloodOxygenLevel" id="bloodOxygenLevel" required pattern={"^\\d{2}$"}/>
                  </Form.Group>
                <Button type="submit">Update</Button>
              </Form>
          </Modal.Body>
      </Modal>
      }
    </>
  )
}

export default PatientProfileAppointment