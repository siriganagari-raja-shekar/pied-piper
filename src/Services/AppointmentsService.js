import axios from 'axios'
import { getStoredUser, getActiveToken } from './AuthService'
import moment from 'moment'

export const getUpcomingAppointments = async () => {
    var config = {
        method: 'get',
        url: process.env.REACT_APP_APPOINTMENTS,
        params: {
            patientID: getStoredUser().id
        },
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        }
    };

    try {
        const response = await axios(config)
        const appointments = response.data
        let upcomingAppointments = []
        appointments.map((appointment) => {
            const appointmentTime = moment(appointment.time)
            const today = moment()
            if (appointmentTime.isAfter(today)) {
                upcomingAppointments.push(appointment)
            }
        })
        return upcomingAppointments;
    } catch (e) {
        console.log(e)
    }
}

export const getAppointmentHistory = async () => {
    var config = {
        method: 'get',
        url: process.env.REACT_APP_APPOINTMENTS,
        params: {
            patientID: getStoredUser().id
        },
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        }
    };

    try {
        const response = await axios(config)
        const appointments = response.data
        let appointmentsHistory = []
        appointments.map((appointment) => {
            const appointmentTime = moment(appointment.time)
            const today = moment()
            if (appointmentTime.isBefore(today)) {
                appointmentsHistory.push(appointment)
            }
        })
        return appointmentsHistory;
    } catch (e) {
        console.log(e)
    }
}

export const getLastAppointment= async ()=>{
    var config = {
        method: 'get',
        url: process.env.REACT_APP_APPOINTMENTS,
        params: {
            patientID: getStoredUser().id
        },
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        }
    };

    try {
        const response = await axios(config)
        const appointments = response.data
        let lastAppointment = appointments.find((appointment)=>{
            if(appointment.vitals)
                return appointment
        })
        return lastAppointment;
    } catch (e) {
        console.log(e)
    }
}

export const getAllLabTests = async ()=>{
    try{
        const appointmentHistory = await getAppointmentHistory()
        const labTests= []
        appointmentHistory.map((appointment)=>{
            appointment.labs.map(lab => {
                lab['doctor'] = appointment.doctor
                labTests.push(lab)
            })
        })
        return labTests
    } catch(e) {
        console.log(e)
    }

}

