import React from 'react'
import { getAppointmentHistory } from '../../../services/appointmentsService'
import { useState, useEffect } from 'react'
import { getStoredUser } from '../../../services/authService'
import { getDoctorAppointmentHistory } from '../../../services/appointmentsService'
import { Stack } from 'react-bootstrap'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { patientNavLInks } from '../Properties/patientNavLinks'
import PatientAppointmentHistory from '../../../components/patient/PatientAppointmentHistory/PatientAppointmentHistory'
import './PatientAppointmentHistoryPage.scss'

const PatientAppointmentHistoryPage = () => {
  const [appointmentHistory, setAppointmentHistory] = useState([])
    const user= getStoredUser()

    const populateData =async ()=>{
        const pAppointments = await getAppointmentHistory();

        setAppointmentHistory(pAppointments)
    }

    useEffect(()=>{
        populateData()
    }, [])

    return (
        <Stack direction='horizontal' id='appointments-page-container' className='flex-wrap' gap={3} >
            <NavBar links={patientNavLInks} />
            <Stack direction='vertical'>
                {
                    <PatientAppointmentHistory appointments={appointmentHistory} limit={100} type={"1"} title="Appointment History"/>
                }
            </Stack>
        </Stack>
    )
}

export default PatientAppointmentHistoryPage