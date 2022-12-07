import React from 'react'
import { useEffect, useState } from 'react'
import { Stack } from 'react-bootstrap'
import NavBar from '../../../components/commonComponents/NavBar/NavBar'
import { doctorNavLinks } from '../properties/doctorNavLinks'
import { getStoredUser } from '../../../services/authService'
import PatientProfileAppointment from '../../../components/doctor/manageAppointments/PatientProfileAppointment/PatientProfileAppointment'
import AppointmentChat from '../../../components/doctor/manageAppointments/AppointmentChat/AppointmentChat'
import ManagePrescription from '../../../components/doctor/manageAppointments/ManagePrescription/ManagePrescription'
import ManageLabTests from '../../../components/doctor/manageAppointments/ManageLabTests/ManageLabTests'
import { useParams } from 'react-router-dom'
import { patientNavLInks } from '../../patient/Properties/patientNavLinks'


const ManageAppointments = () => {
    const user = getStoredUser();
    const params = useParams()
    const populateData = async () => {

    }

    useEffect(() => {

    }, [])

    return (
        <Stack id="doctor-dashboard-container" direction='horizontal' gap={3}>
            <NavBar links={user.role === "doctor" ? doctorNavLinks : patientNavLInks} />
            <Stack direction='horizontal' gap={3} style={{ width: '100%', margin: '1em' }}>
                <Stack direction='vertical' gap={3}>
                    <PatientProfileAppointment appointmentId={params.id} displayHeading={false}/>
                    <AppointmentChat appointmentId={params.id} />
                </Stack>
                <Stack direction='vertical' gap={3}>
                    <ManagePrescription appointmentId={params.id} />
                    <ManageLabTests appointmentId={params.id} />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ManageAppointments