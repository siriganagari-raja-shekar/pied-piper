import React from 'react'
import AppointmentForm from '../../../Components/Patient/Appointments/AppointmentForm/AppointmentForm'
import NavBar from '../../../Components/Patient/Dashboard/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faCalendarCheck, faClockRotateLeft,
    faUser, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { Stack } from 'react-bootstrap'
import './BookAppointments.scss'
import { useState, useEffect } from 'react'
import { getUpcomingAppointments } from '../../../Services/AppointmentsService'
import UpcomingAppointments from '../../../Components/Patient/Dashboard/UpcomingAppointments/UpcomingAppointments'
import { getCities } from '../../../Services/UserService'

const BookAppointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [cities, setCities] = useState([])
    const links = [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: <FontAwesomeIcon icon={faChartLine} />
        },
        {
            name: "Book Appointments",
            url: "/appointments",
            icon: <FontAwesomeIcon icon={faCalendarCheck} />
        },
        {
            name: "Appointment History",
            url: "/history",
            icon: <FontAwesomeIcon icon={faClockRotateLeft} />
        },
        {
            name: "Profile",
            url: "/profile",
            icon: <FontAwesomeIcon icon={faUser} />
        },
        {
            name: "logout",
            url: "/logout",
            icon: <FontAwesomeIcon icon={faRightFromBracket} />
        }
    ]

    const populateData = async () => {
        const appointments = await getUpcomingAppointments()
        const doctorCities= await getCities()

        setUpcomingAppointments(appointments)
        setCities(doctorCities)
    }

    useEffect(() => {
        populateData()
    }, [])
    return (
        <Stack id="book-appointment-container" direction='horizontal' gap={3}>
            <NavBar links={links} />
            <Stack direction='horizontal' gap={3} className='align-items-bottom' style={{width: '100%', margin: '1em'}}>
                <AppointmentForm cities={cities}/>
            </Stack>
        </Stack>
    )
}

export default BookAppointments