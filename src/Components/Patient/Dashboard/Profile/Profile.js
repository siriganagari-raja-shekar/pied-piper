import React from 'react'
import './Profile.scss'

const Profile = (props) => {
    return (
        <div id="profileMedications">
            <div id="profile">
                <div id="profilePic">

                </div>
                <div id="details">
                    <ul>
                        <li><h3>{props.name}</h3></li>
                        <li>{props.dob}</li>
                        <li>{props.mailid}</li>
                    </ul>
                </div>
            </div>
            <div id="medications">
                <ul id="morning">
                    {props.meds.morning.map((med) =>  <li key={med}>{med}</li>)}
                </ul>
                <ul id="afternoon">
                    {props.meds.afternoon.map((med) => <li key={med}>{med}</li>)}
                </ul>
                <ul id="night">
                    {props.meds.night.map((med) => <li key={med}>{med}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Profile