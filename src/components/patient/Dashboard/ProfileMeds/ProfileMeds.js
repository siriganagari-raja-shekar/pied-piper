import React from 'react'
import './ProfileMeds.scss'
import { Stack } from 'react-bootstrap'
import moment from 'moment'
import { formatDate } from '../../../../services/utils'

const ProfileMeds = (props) => {
    return (
        <Stack id="profileMedications" direction='vertical' gap={5} 
        className=''>
            <Stack id="profile" direction='horizontal' gap={3}>
                <div id="profilePic">

                </div>
                <Stack id="details" direction='vertical'>
                    <h4>{props.name}</h4>
                    <p>Born on <b>{formatDate(props.dob,"Do MMM, YY")}</b></p>
                    <p>{props.mailid}</p>
                </Stack>
            </Stack>
            <Stack id="medications">
                <ul id="morning">
                    {props.meds.map((med) => {
                        if (med.timeOfDayToTake === 'Morning')
                            return (
                                <li key={med.id}>{med.name}</li>
                            )
                    })}
                </ul>
                <ul id="afternoon">
                    {props.meds.map((med) => {
                        if (med.timeOfDayToTake === 'Afternoon')
                            return (
                                <li key={med.id}>{med.name}</li>
                            )
                    })}
                </ul>
                <ul id="night">
                    {props.meds.map((med) => {
                        if (med.timeOfDayToTake === 'Night')
                            return (
                                <li key={med.id}>{med.name}</li>
                            )
                    })}
                </ul>
            </Stack>
        </Stack>
    )
}

export default ProfileMeds