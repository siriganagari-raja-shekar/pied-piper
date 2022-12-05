import React, { useState } from 'react'
import NavBar from '../../../Components/Patient/Dashboard/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faCalendarCheck, faClockRotateLeft,
    faUser, faRightFromBracket, faTemperatureHalf, faDroplet, faHeartPulse, faLungs
} from '@fortawesome/free-solid-svg-icons'
import Profile from '../../../Components/Patient/Dashboard/Profile/Profile'
import StatsPanel from '../../../Components/Patient/Dashboard/StatsPanel/StatsPanel'
import './Dashboard.scss'
import Vitals from '../../../Components/Patient/Dashboard/Vitals/Vitals'
import { Stack } from 'react-bootstrap'
import UpcomingAppointments from '../../../Components/Patient/Dashboard/UpcomingAppointments/UpcomingAppointments'
import Prescriptions from '../../../Components/Patient/Dashboard/Prescriptions/Prescriptions'
import LabResults from '../../../Components/Patient/Dashboard/LabResults/LabResults'
import { getStoredUser } from '../../../Services/AuthService'
import { getAllLabTests, getAppointmentHistory, getLastAppointment, getUpcomingAppointments } from '../../../Services/AppointmentsService'
import { useEffect } from 'react'

export const Dashboard = () => {

    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [lastAppointment, setLastAppointment] = useState({
        vitals: {},
        prescription: {
            meds: []
        }
    })
    const [appointmentHistory, setAppointmentHistory] = useState([])
    const [labTests, setLabTests] = useState([])

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
        const vitals = await getLastAppointment()
        const pastAppointments = await getAppointmentHistory()
        const tests = await getAllLabTests()

        setLastAppointment(vitals)
        setUpcomingAppointments(appointments)
        setAppointmentHistory(pastAppointments)
        setLabTests(tests)
    }

    useEffect(() => {
        populateData()
    }, [])

    const user = getStoredUser()
    const vitals = [
        {
            name: "Heart rate",
            logo: <FontAwesomeIcon icon={faHeartPulse} />,
            value: lastAppointment.vitals.pulse,
            measure: " bpm",
            desc: "Pulse is the most important physiological indicator"
        },
        {
            name: "Temperature",
            logo: <FontAwesomeIcon icon={faTemperatureHalf} />,
            value: lastAppointment.vitals.temperature,
            measure: " F",
            desc: "Temperature below 35 Celsius is very dangerous"
        },
        {
            name: "Blood Pressure",
            logo: <FontAwesomeIcon icon={faDroplet} />,
            value: lastAppointment.vitals.bloodPressure,
            measure: "",
            desc: "Blood pressure can rise and fall several times a day"
        },
        {
            name: "SpO2",
            logo: <FontAwesomeIcon icon={faLungs} />,
            value: lastAppointment.vitals.bloodOxygenLevel,
            measure: " %",
            desc: "Blood pressure can rise and fall several times a day"
        }
    ]

    return (
        <Stack id="dashboard" direction='horizontal' gap={3} className='justify-content-between'>
            <NavBar links={links} />
            <Stack direction='horizontal' className='p-3' gap={3}>
                <Stack direction='vertical' gap={3} className='justify-content-between'>
                    <StatsPanel />
                    <Vitals vitals={vitals} />
                    <Stack direction='horizontal' gap={3}>
                        <UpcomingAppointments appointments={upcomingAppointments} />
                        <Stack direction='vertical' gap={3}>
                            <Prescriptions appointmentHistory={appointmentHistory} />
                            <LabResults labTests={labTests} />
                        </Stack>
                    </Stack>
                </Stack>
                <Profile name={user.name}
                    mailid={user.email}
                    dob={user.dateOfBirth}
                    meds={lastAppointment.prescription.meds}
                />
            </Stack>
        </Stack>
    )
}
