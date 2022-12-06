import React, { useState } from "react";
import { Form, Button, Alert, Card, Stack } from "react-bootstrap";
import { authenticateUser } from "../services/authService";
import {useEffect} from 'react';
import * as userService from './../services/userService';
import { useNavigate } from "react-router-dom";

function Signin() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({ value: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(()=>{
      const loggedInUser = userService.getUserFromLocalStorage();
      if(loggedInUser){
        if(loggedInUser.role === "patient")
          navigate("/dashboard");
        else
          navigate("/doctor/dashboard");
      }
  })

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    //if username or password field is empty, return error message
    if (userData.username === "" || userData.password === "") {
      setErrorMessage({
        value: "Empty username/password field"
      });
    } else if (await authenticateUser(userData.username, userData.password)) {
      //Signin Success
      const user= JSON.parse(localStorage.getItem("user"))
      if (user.role === 'patient')
        window.location.pathname = "/dashboard";

      if (user.role === 'doctor')
        window.location.pathname = "/doctor/dashboard";
    } else {
      //If credentials entered is invalid
      setErrorMessage({ value: "Invalid username/password" });
    }
  };

  return (
    <>
      <Stack className='align-items-center justify-content-center' style={{ height: '100%', backgroundColor: "#e8e8e8" }}>
        <Card style={{ width: '30%' }}>
          <Card.Header><h3 className='text-center'>Sign in</h3></Card.Header>
          <Card.Body>
            {errorMessage.value && (
              <Alert variant='danger'>
                {errorMessage.value}
              </Alert>
            )}

            <Form >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='username' onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={handleInputChange} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Stack>
    </>
  );
}

export default Signin;