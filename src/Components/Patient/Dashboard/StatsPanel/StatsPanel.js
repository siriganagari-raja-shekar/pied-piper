import React from 'react'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { faVideo, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Stats from '../Stats/Stats'
import { Stack } from 'react-bootstrap'
import { getStoredUser } from '../../../../Services/AuthService'

const StatsPanel = () => {
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
    return (
        <Stack direction='horizontal' gap={3} className='justify-content-between'>
            {stats.map((stat)=> <Stats key={stat.statId} stats={stat} />)}
        </Stack>
    )
}

export default StatsPanel