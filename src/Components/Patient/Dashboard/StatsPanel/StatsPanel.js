import React from 'react'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { faVideo, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Stats from '../Stats/Stats'
import './StatsPanel.scss'

const StatsPanel = () => {
    const stats=[
        {
            statId: "appointmentStat",
            statIcon: <FontAwesomeIcon icon={faCalendarCheck} />,
            statCount: 3,
            statName: "Appointemnts left",
            buttonText: "Make an appointment"
        },
        {
            statId: "videoStat",
            statIcon: <FontAwesomeIcon icon={faVideo} />,
            statCount: 2,
            statName: "Video consultations left",
            buttonText: "Make a video consultation"
        },
        {
            statId: "labTestStat",
            statIcon: <FontAwesomeIcon icon={faMicrophone} />,
            statCount: 3,
            statName: "Free lab tests left",
            buttonText: "Book a lab test"
        },
        {
            statId: "videoStat",
            statIcon: <FontAwesomeIcon icon={faVideo} />,
            statCount: 2,
            statName: "Video consultations left",
            buttonText: "Make a video consultation"
        }
    ]
    return (
        <div id="stats">
            {stats.map((stat)=> <Stats key={stat.statId} stats={stat} />)}
        </div>
    )
}

export default StatsPanel