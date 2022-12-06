import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faCalendarCheck, faClockRotateLeft,
    faUser, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

export const patientNavLInks = [
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
        name: "Logout",
        url: "/logout",
        icon: <FontAwesomeIcon icon={faRightFromBracket} />
    }
]