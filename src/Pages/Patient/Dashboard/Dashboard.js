import React, { useState } from 'react'
import NavBar from '../../../Components/Patient/Dashboard/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faCalendarCheck, faClockRotateLeft,
    faUser, faRightFromBracket, faTemperatureHalf, faDroplet, faHeartPulse
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
import { getUpcomingAppointments } from '../../../Services/AppointmentsService'
import { useEffect } from 'react'

export const Dashboard =  () => {

    const [upcomingAppointments, setUpcomingAppointments] = useState([])

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

    const populateAppointments= async()=>{
        const appointments = await getUpcomingAppointments()
        setUpcomingAppointments(appointments)
    }
    
    useEffect(()=>{
        populateAppointments()
    }, [])

    const user= getStoredUser()
    
    const meds = {
        morning: [
            "Brufen",
            "Paracetamol"
        ],
        afternoon: [
            "Cofsils",
            "Paracetamol"
        ],
        night: [
            "Brufen",
            "Paracetamol"
        ]
    }

    const vitals = [
        {
            name: "Heart rate",
            logo: <FontAwesomeIcon icon={faHeartPulse} />,
            value: 102,
            measure: "bpm",
            desc: "Pulse is the most important physiological indicator"
        },
        {
            name: "Temperature",
            logo: <FontAwesomeIcon icon={faTemperatureHalf} />,
            value: 37.4,
            measure: "c",
            desc: "Temperature below 35 Celsius is very dangerous"
        },
        {
            name: "Blood Pressure",
            logo: <FontAwesomeIcon icon={faDroplet} />,
            value: "120/80",
            measure: "",
            desc: "Blood pressure can rise and fall several times a day"
        }
    ]

    const prescriptions = [
        {
            id: '1',
            problemDiagnosed: "Fever",
            date: "12th Aug 2022",
            doctor: {
                name: 'Dr. Andrew rathod',
            }
        },
        {
            id: '2',
            problemDiagnosed: "Eye infection",
            date: "19th Dec 2022",
            doctor: {
                name: 'Dr. Richard',
            }
        },
        {
            id: '3',
            problemDiagnosed: "AIDs",
            date: "19th Dec 2022",
            doctor: {
                name: 'Dr. Sins',
            }
        },
        {
            id: '4',
            problemDiagnosed: "HIV",
            date: "12th April 2022",
            doctor: {
                name: 'Dr. Samaram',
            }
        },
        {
            id: '5',
            problemDiagnosed: "Herpes",
            date: "14th Feb 2022",
            doctor: {
                name: 'Dr. Sins',
            }
        }
    ]

    const results = [
        {
            id: '1',
            name: "X-ray",
            date: "22nd Sept 2022"
        },
        {
            id: '2',
            name: "Glucose levels test",
            date: "3rd Aug 2022"
        }
    ]

    return (
        <Stack id="dashboard" direction='horizontal' gap={3} className='justify-content-between'>
            {console.log(upcomingAppointments)}
            <NavBar links={links} />
            <Stack direction='horizontal' className='p-3' gap={3}>
                <Stack direction='vertical' gap={3} className='justify-content-between'>
                    <StatsPanel />
                    <Vitals vitals={vitals} />
                    <Stack direction='horizontal' gap={3}>
                        <UpcomingAppointments appointments={upcomingAppointments} />
                        <Stack direction='vertical' gap={3}>
                            <Prescriptions prescriptions={prescriptions} />
                            <LabResults results={results} />
                        </Stack>
                    </Stack>
                </Stack>
                <Profile name={user.name} mailid={user.email} dob={user.dateOfBirth} meds={meds} />
            </Stack>
        </Stack>
    )
}
