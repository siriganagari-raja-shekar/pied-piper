import React from 'react'
import { Stack } from 'react-bootstrap'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { doctorNavLinks } from '../properties/doctorNavLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faUsers, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { getStoredUser } from '../../../services/authService'
import StatsPanel from '../../../components/commonComponents/StatsPanel/StatsPanel'
import {
  getDoctorAppointmentHistory,
  getDoctorStats,
  getInPersonConsultationsByDoctorID
} from '../../../services/appointmentsService'
import { useState } from 'react'
import { useEffect } from 'react'
import Appointments from '../../../components/doctor/Appointments/Appointments'
import './DoctorDashboard.scss'
import RecentPatients from '../../../components/doctor/RecentPatients/RecentPatients'
import NextPatient from '../../../components/doctor/NextPatient/NextPatient'


const DoctorDashboard = () => {
  const user = getStoredUser()
  const [consultationsStats, setConsultationsStats] = useState({})
  const [inPersonConsultations, setInPersonConsultations] = useState([])
  const [appointmentHistory, setAppointmentHistory] = useState([]);

  const populateData = async () => {
    const doctorStats = await getDoctorStats(user.id)
    const inPersonAppointments = await getInPersonConsultationsByDoctorID(user.id)
    const pastAppointments = await getDoctorAppointmentHistory(user.id)
    console.log(pastAppointments)
    setConsultationsStats(doctorStats)
    setInPersonConsultations(inPersonAppointments)
    setAppointmentHistory(pastAppointments)
  }

  useEffect(() => {
    populateData()
  }, [])

  const stats = [
    {
      statId: "appointmentStat",
      statIcon: <FontAwesomeIcon icon={faDoorOpen} />,
      statCount: consultationsStats.inPersonConsultations,
      statName: "Total in-person appointments"
    },
    {
      statId: "videoStat",
      statIcon: <FontAwesomeIcon icon={faVideo} />,
      statCount: consultationsStats.videoConsultations,
      statName: "Total video appointments"
    },
    {
      statId: "labTestStat",
      statIcon: <FontAwesomeIcon icon={faUsers} />,
      statCount: consultationsStats.totalConsultations,
      statName: "Total appointments"
    }
  ]

  return (
    <>
      <Stack id="doctor-dashboard-container" direction='horizontal' gap={3}>
        <NavBar links={doctorNavLinks} />
        <Stack direction='horizontal' gap={3} style={{ width: '100%', margin: '1em' }}>
          <Stack direction='vertical' gap={3}>
            <StatsPanel stats={stats} />
            <Stack direction='horizontal' gap={3}>
              <Appointments appointments={inPersonConsultations} type="in-person" limit="3" />
              <NextPatient />
            </Stack>
            <Stack direction='vertical' id="patientTable">
              <RecentPatients appointmentHistory={appointmentHistory} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default DoctorDashboard