import React from 'react'
import { useState, useEffect } from 'react'
import { Stack } from 'react-bootstrap'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { getUpcomingAppointmentsByDoctorId } from '../../../services/appointmentsService'
import { doctorNavLinks } from '../properties/doctorNavLinks'
import { getStoredUser } from '../../../services/authService'
import Appointments from '../../../components/doctor/Appointments/Appointments'
import './AppointmentsPage.scss'

const AppointmentsPage = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const user= getStoredUser()

    const populateData =async ()=>{
        const futureAppointments = await getUpcomingAppointmentsByDoctorId(user.id)

        setUpcomingAppointments(futureAppointments)
    }

    useEffect(()=>{
        populateData()
    }, [])

    return (
        <Stack direction='horizontal' id='appointments-page-container' className='flex-wrap' gap={3} >
            <NavBar links={doctorNavLinks} />
            <Stack direction='vertical'>
                {
                    <Appointments appointments={upcomingAppointments} limit={100} type={"2"} title="Future appointments"/>
                }
            </Stack>
        </Stack>
    )
}

export default AppointmentsPage