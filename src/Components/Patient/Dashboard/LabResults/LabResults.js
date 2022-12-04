import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePrescription, faEye } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Stack } from 'react-bootstrap'
import './LabResults.scss'

const LabResults = ({results}) => {
  return (
    <Stack direction='vertical' gap={3} id='labresults'>
            <Stack direction='horizontal' id='title'>
                <span><FontAwesomeIcon icon={faFilePrescription} /></span>
                <h2>Lab results</h2>
            </Stack>
            {
                results.map((result) => {
                    return (
                        <Stack key={result.id} direction='horizontal' className='labresult'>
                            <Stack direction='vertical'>
                                <p><b>{result.name}</b>, {result.date}</p>
                            </Stack>
                            <span><FontAwesomeIcon icon={faEye} /></span>
                        </Stack>
                    )
                })
            }
            <NavLink to="./dashboard">View more</NavLink>
        </Stack>
  )
}

export default LabResults