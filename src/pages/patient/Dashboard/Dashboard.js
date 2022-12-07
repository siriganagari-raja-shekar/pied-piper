import React, { useState, useEffect } from 'react'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTemperatureHalf, faDroplet, faHeartPulse, faLungs
} from '@fortawesome/free-solid-svg-icons'
import StatsPanel from '../../../components/commonComponents/StatsPanel/StatsPanel'
import ProfileMeds from '../../../components/patient/Dashboard/ProfileMeds/ProfileMeds'

import Vitals from '../../../components/patient/Dashboard/Vitals/Vitals'
import { Stack } from 'react-bootstrap'
import UpcomingAppointments from '../../../components/patient/Dashboard/UpcomingAppointments/UpcomingAppointments'
import Prescriptions from '../../../components/patient/Dashboard/Prescriptions/Prescriptions'
import LabResults from '../../../components/patient/Dashboard/LabResults/LabResults'
import { getStoredUser } from '../../../services/authService'
import { getAllLabTests, getAppointmentHistory, getLastAppointment, getUpcomingAppointments } from '../../../services/appointmentsService'
import { patientNavLInks } from '../Properties/patientNavLinks'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { faVideo, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import './Dashboard.scss'

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

    const user= getStoredUser()
    const stats=[
        {
            statId: "appointmentStat",
            statIcon: <FontAwesomeIcon icon={faCalendarCheck} />,
            statCount: user.appointmentsLeft,
            statName: "Appointemnts left",
            buttonText: "Make an appointment"
        },
        {
            statId: "videoStat",
            statIcon: <FontAwesomeIcon icon={faVideo} />,
            statCount: user.videoConsultationsLeft,
            statName: "Video consultations left",
            buttonText: "Make a video consultation"
        },
        {
            statId: "labTestStat",
            statIcon: <FontAwesomeIcon icon={faMicrophone} />,
            statCount: user.labTestsLeft,
            statName: "Free lab tests left",
            buttonText: "Book a lab test"
        }
    ]


    const populateData = async () => {
        const appointments = await getUpcomingAppointments()
        const vitals = await getLastAppointment()
        const pastAppointments = await getAppointmentHistory()
        const tests = await getAllLabTests()
        
        if(vitals)
            setLastAppointment(vitals)
        setUpcomingAppointments(appointments)
        setAppointmentHistory(pastAppointments)
        setLabTests(tests)
    }

    useEffect(() => {
        populateData()
    }, [])

    const vitals = [
        {
            name: "Heart rate",
            logo: <FontAwesomeIcon icon={faHeartPulse} />,
            value: lastAppointment.vitals.pulse ?  lastAppointment.vitals.pulse : "-",
            measure: " bpm",
            desc: "Pulse is the most important physiological indicator"
        },
        {
            name: "Temperature",
            logo: <FontAwesomeIcon icon={faTemperatureHalf} />,
            value: lastAppointment.vitals.temperature ? lastAppointment.vitals.temperature : "-",
            measure: " F",
            desc: "Temperature below 35 Celsius is very dangerous"
        },
        {
            name: "Blood Pressure",
            logo: <FontAwesomeIcon icon={faDroplet} />,
            value: lastAppointment.vitals.bloodPressure ?  lastAppointment.vitals.bloodPressure :"-",
            measure: "",
            desc: "Blood pressure can rise and fall several times a day"
        },
        {
            name: "SpO2",
            logo: <FontAwesomeIcon icon={faLungs} />,
            value: lastAppointment.vitals.bloodOxygenLevel? lastAppointment.vitals.bloodOxygenLevel:"-" ,
            measure: " %",
            desc: "Blood pressure can rise and fall several times a day"
        }
    ]

    return (
        <Stack id="dashboard" direction='horizontal' gap={3} className='justify-content-between'>
            <NavBar links={patientNavLInks} />
            <Stack direction='horizontal' className='p-3' gap={3}>
                <Stack direction='vertical' gap={3} className='justify-content-between'>
                    <StatsPanel stats={stats}/>
                    <Vitals vitals={vitals} />
                    <Stack direction='horizontal' gap={3}>
                        <UpcomingAppointments appointments={upcomingAppointments} />
                        <Stack direction='vertical' gap={3}>
                            <Prescriptions appointmentHistory={appointmentHistory} />
                            <LabResults labTests={labTests} />
                        </Stack>
                    </Stack>
                </Stack>
                <ProfileMeds name={user.name}
                    mailid={user.email}
                    dob={user.dateOfBirth}
                    user={user}
                    meds={lastAppointment.prescription ? lastAppointment.prescription.meds : []}
                />
            </Stack>
        </Stack>
    )
}
