import React from 'react'
import './Profile.scss'
import { Stack } from 'react-bootstrap'
import moment from 'moment'

const Profile = (props) => {
    return (
        <Stack id="profileMedications" direction='vertical' gap={5} >
            <Stack id="profile" direction='horizontal' gap={3}>
                <div id="profilePic">

                </div>
                <Stack id="details" direction='vertical'>
                        <h4>{props.name}</h4>
                        <p>Born on <b>{moment(props.dob).format("Do MMM, YY")}</b></p>
                        <p>{props.mailid}</p>
                </Stack>
            </Stack>
            <Stack id="medications">
                <ul id="morning">
                    {props.meds.morning.map((med) =>  <li key={med}>{med}</li>)}
                </ul>
                <ul id="afternoon">
                    {props.meds.afternoon.map((med) => <li key={med}>{med}</li>)}
                </ul>
                <ul id="night">
                    {props.meds.night.map((med) => <li key={med}>{med}</li>)}
                </ul>
            </Stack>
        </Stack>
    )
}

export default Profile