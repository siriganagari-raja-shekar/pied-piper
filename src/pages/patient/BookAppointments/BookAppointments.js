import React from 'react'
import AppointmentForm from '../../../components/patient/Appointments/AppointmentForm/AppointmentForm'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faCalendarCheck, faClockRotateLeft,
    faUser, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { Stack } from 'react-bootstrap'
import './BookAppointments.scss'
import { useState, useEffect } from 'react'
import { getCities } from '../../../services/userService'

const BookAppointments = () => {
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
        const doctorCities= await getCities()

        setCities(doctorCities)
    }

    useEffect(() => {
        populateData()
    }, [])
    
    return (
        <Stack id="book-appointment-container" direction='horizontal' gap={3} className='flex-column flex-lg-row'>
            <NavBar links={links} />
            <Stack direction='horizontal' gap={3} id='book-apt-form' className='align-items-bottom' style={{ margin: '1em'}}>
                <AppointmentForm cities={cities}/>
            </Stack>
        </Stack>
    )
}

export default BookAppointments