import React from 'react'
import { Table } from 'react-bootstrap'
import { formatDate } from '../../../services/utils'
import './RecentPatients.scss'
import { Stack } from 'react-bootstrap'

const RecentPatients = ({ appointmentHistory }) => {
  
  let count = 0
  return (
    <Stack direction='vertical' gap={3}>
      <Stack direction='horizontal' id='title'>
        <h3>Recent patients</h3>
      </Stack>

      <Table >
        <thead>
          <tr style={{ background: "#3e65a7", color: "white" }}>
            <th>#</th>
            <th>Name</th>
            <th>Date</th>
            <th>Appointment Type</th>
            <th>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {
            appointmentHistory.map(appointment => {
                return appointment.prescription
                ?
                (
                  <tr key={appointment.id}>
                    <td>{++count}</td>
                    <td>{appointment.patient.name}</td>
                    <td>{formatDate(appointment.time, "MMM Do YYYY, h:mm A")}</td>
                    <td>{appointment.appointmentType}</td>
                    <td>{appointment.prescription.problemDiagnosed}</td>
                  </tr>
                )
                :
                <></>
            })
          }
        </tbody>
      </Table>
    </Stack>
  )
}

export default RecentPatients