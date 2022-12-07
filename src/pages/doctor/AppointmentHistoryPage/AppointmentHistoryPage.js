import React from 'react'
import { useState, useEffect } from 'react'
import { Stack } from 'react-bootstrap'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { getDoctorAppointmentHistory } from '../../../services/appointmentsService'
import { doctorNavLinks } from '../properties/doctorNavLinks'
import { getStoredUser } from '../../../services/authService'
import Appointments from '../../../components/doctor/Appointments/Appointments'
import './AppointmentHistoryPage.scss'

const AppointmentHistoryPage = () => {
    const [appointmentHistory, setAppointmentHistory] = useState([])
    const user= getStoredUser()

    const populateData =async ()=>{
        const pastAppointments = await getDoctorAppointmentHistory(user.id)

        setAppointmentHistory(pastAppointments)
    }

    useEffect(()=>{
        populateData()
    }, [])

    return (
        <Stack direction='horizontal' id='appointments-page-container' className='flex-wrap' gap={3} >
            <NavBar links={doctorNavLinks} />
            <Stack direction='vertical'>
                {
                    <Appointments appointments={appointmentHistory} limit={100} type={"2"} title="Appointment History"/>
                }
            </Stack>
        </Stack>
    )
}

export default AppointmentHistoryPage