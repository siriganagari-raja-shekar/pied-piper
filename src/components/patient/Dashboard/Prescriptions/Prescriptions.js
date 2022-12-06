import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePrescription, faEye } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Stack } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Prescriptions.scss'

const Prescription = ({ prescription, doctor }) => {
    return (
        <Stack direction='horizontal' className='prescription'>
            <Stack direction='vertical'>
                <p><b>{prescription.problemDiagnosed}</b>, {prescription.date}</p>
                <p style={{ fontSize: '12px' }}>by {doctor.name}</p>
            </Stack>
            <span><FontAwesomeIcon icon={faEye} /></span>
        </Stack>
    )
}

const Prescriptions = ({ appointmentHistory }) => {
    const [lgShow, setLgShow] = useState(false);
    let count = 0;
    return (
        <>
            <Stack direction='vertical' gap={3} id='prescriptions'>
                <Stack direction='horizontal' id='title'>
                    <span><FontAwesomeIcon icon={faFilePrescription} /></span>
                    <h2>Past prescriptions</h2>
                </Stack>
                {
                    appointmentHistory.map((appointment) => {
                        if (count < 2 && appointment.prescription) {
                            count++
                            return (
                                <Prescription key={appointment.prescription.id}
                                    prescription={appointment.prescription}
                                    doctor={appointment.doctor}
                                />
                            )
                        }
                    })
                }
                <NavLink onClick={() => setLgShow(true)}>View more</NavLink>
            </Stack>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="Prescriptions"
            >

                <Modal.Header closeButton>
                    <Modal.Title id="Prescriptions">All prescriptions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap={3}>
                        {
                            appointmentHistory.map((appointment) => {
                                if (appointment.prescription) {
                                    return (
                                        <Prescription key={appointment.prescription.id}
                                            prescription={appointment.prescription}
                                            doctor={appointment.doctor}
                                        />
                                    )
                                }
                            })
                        }
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Prescriptions