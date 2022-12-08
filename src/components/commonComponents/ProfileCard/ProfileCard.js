import React from 'react';
import { Stack, Form, Button } from 'react-bootstrap';
import "./ProfileCard.scss";
import profilePicture from "./../../../Assets/Images/profilejpg.jpg";
import { titleCase } from 'title-case';
import { useEffect } from 'react';
import { useState } from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as userService from "../../../services/userService";

const ProfileCard = (props) => {

    const [user, setUser] = useState({
        ...props.user,
        dateOfBirth: new Date(props.user.dateOfBirth)
    });

    const [inputVisible, setInputVisible] = useState({
        name: false,
        phoneNumber: false,
        dateOfBirth: false,
        streetAddress: false,
        city: false,
        zip: false,
        update: false
    });

    const [validated, setValidated] = useState(false);

    const updateDetails = async (event) => {
        const form = event.target;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            console.log("Form validation failed");
        }
        else {
            console.log("Form validation passed");
            const newInputVisible = { ...inputVisible };

            for (const key in newInputVisible) {
                newInputVisible[key] = false;
            }
            setInputVisible(newInputVisible);
            const userToUpdate = {
                ...user,
                dateOfBirth: JSON.stringify(user.dateOfBirth)
            }
            console.log("User to update", userToUpdate);
            const updatedUser = await userService.updateUser(userToUpdate);
            console.log(updatedUser);
        }

        setValidated(true);

    }

    const onInputStateChange = (event) => {
        const target = event.target;
        const inputName = target.name

        const newUser = {
            ...user
        }

        if (inputName === "streetAddress" || inputName === "city" || inputName === "zip") {
            if (user.address || user.hospitalAddress) {
                const addressType = user.role === "patient" ? "address" : "hospitalAddress";
                newUser[addressType][inputName] = target.value.trim();
            }
        }
        else if (inputName === "dateOfBirth") {
            newUser.dateOfBirth = new Date(target.value);
        }
        else {
            newUser[inputName] = target.value.trim();
        }
        setUser(newUser);
    }

    return (
        <Stack direction="horizontal" gap={3} className="justify-content-between" style={{ minHeight: "100%" }}>
            <Stack direction="vertical" gap={3} id='profile-card' className="justify-content-center align-items-center summarySection" >
                <img src={profilePicture} alt="Profile" />
                <Stack direction='vertical' gap={1} className="justify-content-center align-items-center flex-grow-0">
                    <p><b>{user.name}</b></p>
                    <p>{user.role === "patient" ? titleCase(user.subscription + " subscriber") : titleCase(user.hospitalName)}</p>
                    <p>{user.role === "patient" ? user.address.city + ", " + user.address.zip : user.hospitalAddress.city + ", " + user.hospitalAddress.zip}</p>
                </Stack>
            </Stack>
            <Stack direction="vertical"
                gap={3}
                className="justify-content-between summarySection"
                id="profile-form"
            >
                <Form noValidate onSubmit={updateDetails} validated={validated} id='profile-form'>
                    <Form.Group className="mb-3 form-individual-group">
                        <Form.Label>Name</Form.Label>
                        {
                            inputVisible.name
                                ?
                                <>
                                    <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={user.name} onChange={onInputStateChange} pattern={"^[a-zA-Z]{3,} [a-zA-Z]{3,}$"} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter name in the format: First name Last name
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks Good!!
                                    </Form.Control.Feedback>
                                </>

                                :
                                <>
                                    <p>
                                        {user.name}
                                        <span>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => setInputVisible({ ...inputVisible, name: true, update: true })} />
                                        </span>
                                    </p>
                                </>

                        }

                    </Form.Group>
                    <Form.Group className="mb-3 form-individual-group" name="email" onChange={onInputStateChange}>
                        <Form.Label>Email</Form.Label>
                        <p>
                            {user.email}
                        </p>
                    </Form.Group>
                    <Form.Group className="mb-3 form-individual-group">
                        <Form.Label>Phone Number</Form.Label>
                        {
                            inputVisible.phoneNumber
                                ?
                                <>
                                    <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" defaultValue={user.phoneNumber} onChange={onInputStateChange} pattern={"^\\d{3}-\\d{3}-\\d{4}$"} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter phone number in this format: xxx-xxx-xxxx
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks Good!!
                                    </Form.Control.Feedback>
                                </>
                                :
                                <>
                                    <p>
                                        {user.phoneNumber}
                                        <span>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => setInputVisible({ ...inputVisible, phoneNumber: true, update: true })} />
                                        </span>
                                    </p>
                                </>

                        }
                    </Form.Group>
                    <Form.Group className="mb-3 form-individual-group">
                        <Form.Label>Date of Birth</Form.Label>
                        {
                            inputVisible.dateOfBirth
                                ?
                                <>
                                    <Form.Control type="date" name="dateOfBirth" defaultValue={user.dateOfBirth.getFullYear().toString() + "-" + (user.dateOfBirth.getMonth() + 1).toString() + "-" + user.dateOfBirth.getDate().toString()} onChange={onInputStateChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Date of birth is a required field
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks Good!!
                                    </Form.Control.Feedback>
                                </>
                                :
                                <>
                                    <p>
                                        {user.dateOfBirth.toLocaleDateString()}
                                        <span>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => setInputVisible({ ...inputVisible, dateOfBirth: true, update: true })} />
                                        </span>
                                    </p>
                                </>

                        }
                    </Form.Group>
                    <Form.Group className="mb-3 form-individual-group">
                        <Form.Label>Street Address</Form.Label>
                        {
                            inputVisible.streetAddress
                                ?
                                <>
                                    <Form.Control type="text" name="streetAddress" placeholder="Enter street address" defaultValue={user.address ? user.address.streetAddress : user.hospitalAddress.streetAddress} pattern={"^\\d{1,} [a-zA-Z0-9\\s]+$"} onChange={onInputStateChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter address in correct format
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks Good!!
                                    </Form.Control.Feedback>
                                </>
                                :
                                <>
                                    <p>
                                        {user.address ? user.address.streetAddress : user.hospitalAddress.streetAddress}
                                        <span>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => setInputVisible({ ...inputVisible, streetAddress: true, update: true })} />
                                        </span>
                                    </p>
                                </>

                        }
                    </Form.Group>
                    <Form.Group className="mb-3 form-individual-group">
                        <Form.Label>City</Form.Label>
                        {
                            inputVisible.city
                                ?
                                <>
                                    <Form.Control type="text" name="city" placeholder="Enter city" defaultValue={user.address ? user.address.city : user.hospitalAddress.city} onChange={onInputStateChange} pattern={"^[a-z-A-Z ]{4,}$"} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid city name
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks Good!!
                                    </Form.Control.Feedback>
                                </>

                                :
                                <>
                                    <p>
                                        {user.address ? user.address.city : user.hospitalAddress.city}
                                        <span>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => setInputVisible({ ...inputVisible, city: true, update: true })} />
                                        </span>
                                    </p>
                                </>

                        }
                    </Form.Group>
                    <Form.Group className="mb-3 form-individual-group">
                        <Form.Label>Zip</Form.Label>
                        {
                            inputVisible.zip
                                ?
                                <>
                                    <Form.Control type="text" name="zip" placeholder="Enter zip" defaultValue={user.address ? user.address.zip : user.hospitalAddress.zip} onChange={onInputStateChange} pattern={"^\\d{5}$"} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid city name
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks Good!!
                                    </Form.Control.Feedback>
                                </>
                                :
                                <>
                                    <p>
                                        {user.address ? user.address.zip : user.hospitalAddress.zip}
                                        <span>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => setInputVisible({ ...inputVisible, zip: true, update: true })} />
                                        </span>
                                    </p>
                                </>

                        }
                    </Form.Group>
                    {
                        inputVisible.update
                        &&
                        <Button type="submit">Update</Button>
                    }
                </Form>
            </Stack>
        </Stack>
    )
}


export default ProfileCard;