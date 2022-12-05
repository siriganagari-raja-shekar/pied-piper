import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePrescription, faEye } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Stack, Modal } from 'react-bootstrap'
import './LabResults.scss'
import { useState } from 'react'
import { formatDate } from '../../../../services/utils'

const LabResult = ({ labTest }) => {
    return (
        <Stack direction='horizontal' className='labresult'>
            <Stack direction='vertical'>
                <p><b>{labTest.testType}</b>, {formatDate(labTest.time, "MMM Do YYYY")}</p>
            </Stack>
            <span><FontAwesomeIcon icon={faEye} /></span>
        </Stack>
    )
}

const LabResults = ({ labTests }) => {
    const [lgShow, setLgShow] = useState(false);
    let count = 0
    return (
        <>
            <Stack direction='vertical' gap={3} id='labresults'>
                <Stack direction='horizontal' id='title'>
                    <span><FontAwesomeIcon icon={faFilePrescription} /></span>
                    <h2>Lab results</h2>
                </Stack>
                <Stack id="labresultsContainer" gap={3}>
                    {
                        labTests.map((labTest) => {
                            count++
                            if (count <= 2)
                                return (
                                    <LabResult key={labTest.id}
                                    labTest={labTest}
                                    />
                                )
                        })
                    }
                </Stack>
                <NavLink to="./dashboard" onClick={() => setLgShow(true)}>View more</NavLink>
            </Stack>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="labresult"
            >

                <Modal.Header closeButton>
                    <Modal.Title id="labresult" className='text-center'>Lab tests history</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap={3}>
                        {
                            labTests.map((labTest) =>  {
                                return (
                                    <LabResult key={labTest.id}
                                    labTest={labTest}
                                    />
                                )
                            })
                        }
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LabResults