import React from 'react'
import NavBar from '../../../Components/Patient/Dashboard/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCalendarCheck, faClockRotateLeft, 
        faUser, faRightFromBracket, faTemperatureHalf, faDroplet, faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import Profile from '../../../Components/Patient/Dashboard/Profile/Profile'
import StatsPanel from '../../../Components/Patient/Dashboard/StatsPanel/StatsPanel'
import './Dashboard.scss'
import Vitals from '../../../Components/Patient/Dashboard/Vitals/Vitals'

export const Dashboard = () => {
    const links= [
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
            name:"logout",
            url: "/logout",
            icon: <FontAwesomeIcon icon={faRightFromBracket} />
        }
    ]

    const patientName="Mr. Pavan Munaganti";
    const mailid= "munaganti.pavan@gmail.com";
    const dob="12th Dec 1998"
    const meds= {
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

    const vitals=[
        {
            name: "Heart rate",
            logo: <FontAwesomeIcon icon={faHeartPulse}/>,
            value: 102,
            measure: "bpm",
            desc: "Pulse is the most important physiological indicator"
        },
        {
            name: "Temperature",
            logo: <FontAwesomeIcon icon={faTemperatureHalf}/>,
            value: 37.4,
            measure: "c",
            desc: "Temperature below 35 Celsius is very dangerous"
        },
        {
            name: "Blood Pressure",
            logo: <FontAwesomeIcon icon={faDroplet}/>,
            value: "120/80",
            measure: "",
            desc: "Blood pressure can rise and fall several times a day"
        }
    ]

    return (
        <div id="dashboard">
            <NavBar links={links} />
            <StatsPanel />
            <Vitals vitals={vitals}/>
            <Profile name={patientName} mailid={mailid} dob={dob} meds={meds}/>
        </div>
    )
}
