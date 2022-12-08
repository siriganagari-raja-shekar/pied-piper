import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faClockRotateLeft,
    faUser, faRightFromBracket,
    faCalendarCheck
} from '@fortawesome/free-solid-svg-icons'

export const doctorNavLinks = [
    {
        name: "Dashboard",
        url: "/doctor/dashboard",
        icon: <FontAwesomeIcon icon={faChartLine} />
    },
    {
        name: "Appointments",
        url: "/doctor/appointments",
        icon: <FontAwesomeIcon icon={faCalendarCheck} />
    },
    {
        name: "Appointment History",
        url: "/doctor/history",
        icon: <FontAwesomeIcon icon={faClockRotateLeft} />
    },
    {
        name: "Profile",
        url: "/doctor/profile",
        icon: <FontAwesomeIcon icon={faUser} />
    },
    {
        name: "Logout",
        url: "/logout",
        icon: <FontAwesomeIcon icon={faRightFromBracket} />
    }
]