import axios from 'axios'
import { getStoredUser, getActiveToken } from './authService'
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
            const appointmentTime = new Date(appointment.time);
            const today = new Date();
            if (appointmentTime > today) {
                upcomingAppointments.push(appointment)
            }
        })
        upcomingAppointments.sort((a,b)=> new Date(a.time) < new Date(b.time) ? -1 : 1);
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
            const appointmentTime = new Date(appointment.time);
            const today = new Date();
            if (appointmentTime < today) {
                if(appointment.labs.length > 0)
                    appointment.labs.sort((a,b)=> new Date(a.time) < new Date(b.time) ? 1 : -1)
                appointmentsHistory.push(appointment)
            }
        })
        appointmentsHistory.sort((a,b)=> new Date(a.time) < new Date(b.time) ? 1 : -1);
        return appointmentsHistory;
    } catch (e) {
        console.log(e)
    }
}

export const getLastAppointment = async () => {
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
        let lastAppointment = appointments.find((appointment) => {
            if (appointment.vitals)
                return appointment
        })
        return lastAppointment;
    } catch (e) {
        console.log(e)
    }
}

export const getAllLabTests = async () => {
    try {
        const appointmentHistory = await getAppointmentHistory()
        const labTests = []
        appointmentHistory.map((appointment) => {
            appointment.labs.map(lab => {
                lab['doctor'] = appointment.doctor
                labTests.push(lab)
            })
        })
        return labTests
    } catch (e) {
        console.log(e)
    }

}

export const createAppointment = async (datetime, doctorid, appointmentType) => {
    var config = {
        method: 'POST',
        url: process.env.REACT_APP_APPOINTMENTS,
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        },
        data: {
            doctor: doctorid,
            time: JSON.stringify(datetime),
            appointmentType: appointmentType
        }
    }

    try {
        await axios(config)
        return true
    } catch (e) {
        console.log(e)
    }
}

export const getAppointmentsByDoctorID = async (id) => {
    var config = {
        method: 'get',
        url: process.env.REACT_APP_APPOINTMENTS,
        params: {
            doctorID: getStoredUser().id
        },
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        }
    };

    try {
        const response = await axios(config)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export const getVideoConsultationsByDoctorID = async () => {
    const appointments = await getAppointmentsByDoctorID()

    const videoConsultations = []

    appointments.map(appointment => {
        if (appointment.appointmentType === "video")
            videoConsultations.push(appointment)
    })

    return videoConsultations
}

export const getInPersonConsultationsByDoctorID = async () => {
    const appointments = await getAppointmentsByDoctorID()

    const inPersonConsultations = []

    appointments.map(appointment => {
        if (appointment.appointmentType === "in-person")
            inPersonConsultations.push(appointment)
    })

    return inPersonConsultations
}

export const getTodaysAppointmentsByDoctorID= async (id) => {
    try {
        const appointments = await getAppointmentsByDoctorID(id)
        let todaysAppointments = []
        appointments.map((appointment) => {
            const appointmentTime = new Date(appointment.time);
            const today = new Date();
            const tomorrow= new Date();
            tomorrow.setDate(tomorrow.getDate()+1);
            if (appointmentTime.toDateString() === today.toDateString()) {
                todaysAppointments.push(appointment)
            }
        })

        return todaysAppointments;
    } catch (e) {
        console.log(e)
    }
}

export const getDoctorAppointmentHistory = async (id) => {
    try {
        const appointments = await getAppointmentsByDoctorID(id)
        let appointmentsHistory = []
        appointments.map((appointment) => {
            const appointmentTime = new Date(appointment.time);
            const today = new Date();
            if (appointmentTime < today) {
                appointmentsHistory.push(appointment)
            }
        })
        return appointmentsHistory;
    } catch (e) {
        console.log(e)
    }
}

export const getDoctorStats = async (id) => {
    const appointments = await getAppointmentsByDoctorID(id)
    let videoConsultations = 0
    let inPersonConsultations = 0

    appointments.map(appointment => {
        if (appointment.appointmentType === "video")
            videoConsultations++;

        if (appointment.appointmentType === "in-person")
            inPersonConsultations++;
    })
    const response = {
        "videoConsultations": videoConsultations,
        "inPersonConsultations": inPersonConsultations,
        "totalConsultations": inPersonConsultations + videoConsultations
    }

    return response
}


export const getNextAppointmentByDoctorId = async (id) => {
    const appointments = await getAppointmentsByDoctorID(id)
    let nextAppointment = appointments.find((appointment) => {
        const appointmentTime = new Date(appointment.time);
        const today = new Date();
        if (appointmentTime > today) {
            return appointment
        }
    })
    return nextAppointment;
}

export const getAppointmentById = async (id)=>{
    var config = {
        method: 'GET',
        url: process.env.REACT_APP_APPOINTMENTS+id,
    }
    
    try {
        const response = await axios(config);
        const appointment = response.data;
        console.log(appointment);
        return appointment
    } catch (error) {
        return undefined;
    }
    
}

export const postAppointmentComments = async (id, comment) =>{

    var config = {
        method: "POST",
        url: process.env.REACT_APP_APPOINTMENTS+id+"/comments",
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        },
        data : comment
    }

    try {
        const response = await axios(config);
        const appointment = response.data;
        return appointment
    } catch (error) {
        return undefined;
    }
}

export const updateVitals = async (id, vitals) => {
    var config = {
        method: "PUT",
        url: process.env.REACT_APP_APPOINTMENTS+id+"/vitals",
        headers: {
            'Authorization': `Bearer ${getActiveToken()}`
        },
        data : vitals
    }

    try {
        const response = await axios(config);
        const appointment = response.data;
        console.log(appointment);
        return appointment;
    } catch (error) {
        return undefined;
    }
}