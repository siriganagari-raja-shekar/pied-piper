import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartLine, faClockRotateLeft,
    faUser, faRightFromBracket, faHospitalUser
} from '@fortawesome/free-solid-svg-icons'

export const doctorNavLinks = [
    {
        name: "Dashboard",
        url: "/doctor/dashboard",
        icon: <FontAwesomeIcon icon={faChartLine} />
    },
    {
        name: "Appointment History",
        url: "/doctor/history",
        icon: <FontAwesomeIcon icon={faClockRotateLeft} />
    },
    {
        name: "Patients",
        url: "/doctor/patients",
        icon: <FontAwesomeIcon icon={faHospitalUser} />
    },
    {
        name: "Profile",
        url: "/doctor/profile",
        icon: <FontAwesomeIcon icon={faUser} />
    },
    {
        name: "logout",
        url: "/logout",
        icon: <FontAwesomeIcon icon={faRightFromBracket} />
    }
]