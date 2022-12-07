import React, { useState } from 'react'
import { Form, Button, Stack } from 'react-bootstrap'
import { getDoctor } from '../../../../services/userService'
import './AppointmentForm.scss'
import moment from 'moment'
import { createAppointment } from '../../../../services/appointmentsService'

const AppointmentForm = ({ cities }) => {
    const [appointmentDate, setAppointmentDate] = useState("")
    const [appointmentTime, setAppointmentTime] = useState("")
    const [appointmentType, setAppointmentType] = useState("")
    const [city, setCity] = useState("")
    const [doctors, setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState("")
    const [validated, setValidated] = useState(false);

    const onChangeHandler = async (e) => {
        if (e.target.name === "appointmentDate")
            setAppointmentDate(e.target.value)
        if (e.target.name === "appointmentTime")
            setAppointmentTime(e.target.value)
        if (e.target.name === "appointmentType") {
            setAppointmentType(e.target.value)
            if (e.target.value === "video") {
                const avaiableDoctors = await getDoctor("")
                setDoctors(avaiableDoctors)
            }
        }
        if (e.target.name === "city") {
            setCity(e.target.value)
            const avaiableDoctors = await getDoctor(e.target.value)
            setDoctors(avaiableDoctors)
        }
        if (e.target.name === "doctor")
            setSelectedDoctor(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(false);
        } else {
            const date = new Date(appointmentDate+"T"+appointmentTime);
            if (await createAppointment(date, selectedDoctor, appointmentType)) {
                alert("Appointment created successfully")
                document.getElementById("appointmentForm").reset()
            } else {
                alert("Appointment creation failed, try again")
            }
        }
        setValidated(true);
    }

    return (
        <Form id="appointmentForm" className='p-5' 
            noValidate validated={validated} 
            onSubmit={handleSubmit}
        >
            <Stack direction='vertical' className='justify-content-between' style={{ height: "100%" }}>
                <div className="inputs" >
                    <Form.Group className="mb-3" controlId="appointmentDate">
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control type="date" 
                            name='appointmentDate' 
                            onChange={onChangeHandler} 
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Appointment date cannot be empty
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="appointmentTime">
                        <Form.Label>Appointment Time</Form.Label>
                        <Form.Control type="time" 
                            name="appointmentTime" 
                            onChange={onChangeHandler}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Appointment time cannot be empty
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="appointmentType">
                        <Form.Check
                            inline
                            label="Video consultation"
                            name="appointmentType"
                            type="radio"
                            id="video-consultation"
                            value="video"
                            onChange={onChangeHandler} required
                        />
                        <Form.Check
                            inline
                            label="In person appointment"
                            name="appointmentType"
                            type="radio"
                            id="inperson-consultation"
                            value="in-person"
                            onChange={onChangeHandler} required
                        />
                        <Form.Control.Feedback type="invalid">
                            Appointment Type cannot be empty
                        </Form.Control.Feedback>
                    </Form.Group>
                    {appointmentType === "in-person" &&
                        <Form.Group className="mb-3" controlId="appointmentCity">
                            <Form.Label>Appointment City</Form.Label>
                            <Form.Select aria-label="Default select example"
                                name="city"
                                onChange={onChangeHandler}
                                required
                                >
                                <option selected disabled value="">Select a city</option>
                                {
                                    cities.map(city => <option key={city} value={city}>{city}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                    }

                    {city &&
                        <Form.Group className="mb-3" controlId="selectedDoctor">
                            <Form.Label>Appointment Doctor</Form.Label>
                            <Form.Select aria-label="Default select example"
                                name="doctor"
                                onChange={onChangeHandler}
                                required
                            >
                                <option selected disabled value="">Select a doctor</option>
                                {
                                    doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                    }

                    {appointmentType === "video" &&
                        <Form.Group className="mb-3" controlId="selectedDoctor">
                            <Form.Select aria-label="Default select example"
                                name="doctor"
                                onChange={onChangeHandler}
                                required
                            >
                                <option selected disabled value="">Select a doctor</option>
                                {
                                    doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                    }
                </div>
                <Button id="bookAppointmentBtn" type="submit" >
                    Submit
                </Button>
            </Stack>
        </Form>
    )
}

export default AppointmentForm