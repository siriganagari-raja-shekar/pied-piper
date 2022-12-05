import "./SubscribeForm.scss";
import { useEffect } from "react";
import Toast from "bootstrap/js/src/toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { userSignUp } from "../../../services/authService";
import { useNavigate } from "react-router-dom";


const SubscribeForm = () => {

    const [userRole, setUserRole] = useState("patient");
    const [signupErrorMessage, setSignUpErrorMessage] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    const updateEventListeners = ()=>{
        document.querySelectorAll(".form-group").forEach(group => {
            group.classList.add("my-4");
        });

        var inputRegex = {
            nameRegex: "^\\w+\\s\\w+$",
            emailAddressRegex: "^[a-zA-Z0-9]+@\\w+.\\w{1,3}$",
            passwordRegex: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$" ,
            phoneNumberRegex: "^\\d{3}-\\d{3}-\\d{4}$",
            streetAddressRegex: "^\\d{1,} [a-zA-Z0-9\\s]+$",
            cityRegex: "^[a-zA-Z]{4,}$",
            zipcodeRegex: "^\\d{5}",
            dateOfBirthRegex: "^\\d{2}/\\d{2}/\\d{4}",
            hospitalNameRegex: "^\\w{5,}$",
            specializationRegex: "^\\w{5,}$"
        }

        for (const key in inputRegex) {
            var currInputId = key.substring(0, key.indexOf("Regex"));
            var inputElement = document.getElementById(currInputId);
            if(inputElement){
                inputElement.setAttribute("required", "required");
                inputElement.setAttribute("pattern", inputRegex[key]);
            }
        }
    }

    const clickHandlerForUserRole = event =>{
        const tempVal = event.target.value;
        setUserRole(tempVal);
        setTimeout(() => {
            updateEventListeners();
            addingHandlersForSubscription();
        }, 100);
        
    }
    const addingHandlersForSubscription = ()=>{
        document.querySelectorAll("input[name='subscriptionType']").forEach(radio => {
            radio.addEventListener("input", (event) => {
                var subType = event.target.value.trim();
                var subOptions = {
                    individual: ["Bronze", "Silver", "Gold", "Platinum"],
                    family: ["Basic", "Premium"]
                }
                var selectInput = document.getElementById("membershipPlanSelect");
                selectInput.setAttribute("required", "required");
                while (selectInput.firstChild)
                    selectInput.removeChild(selectInput.firstChild);
                var defaultOption = document.createElement("option");
                defaultOption.setAttribute("selected", "selected");
                defaultOption.setAttribute("disabled", "disabled");
                defaultOption.setAttribute("value", "");
                defaultOption.text = "Choose a plan";
                selectInput.appendChild(defaultOption);

                subOptions[subType].forEach(optionText => {
                    var optionElement = document.createElement("option");
                    optionElement.text = optionText;
                    selectInput.appendChild(optionElement);
                });
                selectInput.parentElement.style.display = "block";
            });
        })
    }
    useEffect(() => {
        document.getElementById("subscribe-form").reset();

        updateEventListeners();
        addingHandlersForSubscription();
        
    }, []);

    const formValidation = async (event) => {
        var form = event.target;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            event.stopPropagation();
            
            const userObject = {};

            userObject.name = document.querySelector("#name").value.trim();
            userObject.email = document.querySelector("#emailAddress").value.trim();
            userObject.password = document.querySelector("#password").value.trim();

            userObject.dateOfBirth = JSON.stringify(new Date(Date.parse(document.querySelector("#dateOfBirth").value)+(300*60000)));
            userObject.phoneNumber = document.querySelector("#phoneNumber").value.trim();

            userObject.role = userRole;
            const addressObject = {}
            addressObject.streetAddress = document.querySelector("#streetAddress").value.trim();
            addressObject.city = document.querySelector("#city").value.trim();
            addressObject.zip = document.querySelector("#zipcode").value.trim();

            if(userRole === "patient"){
                userObject.address = addressObject;
                userObject.subscriptionType = document.querySelector("input[name='subscriptionType']:checked").value;
                userObject.subscription = document.querySelector("#membershipPlanSelect").value;
            }
            else{
                userObject.hospitalAddress = addressObject;
                userObject.hospitalName = document.querySelector("#hospitalName").value;
                userObject.specialization = document.querySelector("#specialization").value;
            }

            const result = await userSignUp(userObject);
            if(result.status === "success"){
                setSignupSuccess(true);
                setTimeout(() => {
                    navigate("/signin");
                }, 4000);
            }
            else{
                setSignUpErrorMessage(result.error);
                setTimeout(() => {
                    setSignUpErrorMessage("");
                }, 5000);
            }
        }

        form.classList.add('was-validated');
    }

    const showToast = (event) => {
        var myToast = Toast.getOrCreateInstance(document.getElementsByClassName("toast")[0]);
        myToast.show();
    }

    return (
        <div className="row justify-content-center my-5 form-container">
            <div className="col-10 col-sm-6">
                <form id="subscribe-form" className="needs-validation px-5 py-5" noValidate onSubmit={formValidation}>
                    <h1 className="text-center mb-3">Subscription Form</h1>
                    
                    
                    <div className="form-group">
                        <label htmlFor="name">Name*</label>
                        <input type="text" className="form-control" id="name" placeholder="First name Last name" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter name in format: First name Last name
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email address*</label>
                        <input type="email" className="form-control" id="emailAddress" placeholder="name@example.com" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter email in format: name@example.com
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input type="password" className="form-control" id="password" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            <b>Please enter password in format:</b> <br />
                            At least one letter <br />
                            At least one digit <br />
                            At least one special character <br/>
                            Minimum eight in length <br />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date Of Birth*</label>
                        <div className="input-group date" id="datePicker">
                        {/* <span className="input-group-text bg-light d-block">
                            <FontAwesomeIcon icon={faCalendar}/>
                        </span> */}
                            <input type="date" className="form-control" id="dateOfBirth"/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                <b>This field is required!</b>
                            </div>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number*</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="xxx-xxx-xxxx" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter phone number in format: xxx-xxx-xxxx
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="patient" className="mx-2 ml-0">User Role: </label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="userRole" id="patient"
                                value="patient" onClick={clickHandlerForUserRole} required defaultChecked/>
                            <label className="form-check-label" htmlFor="patient">Patient</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="userRole" id="doctor" value="doctor" onClick={clickHandlerForUserRole}/>
                            <label className="form-check-label" htmlFor="doctor">Doctor</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="streetAddress">{userRole === "patient" ? "Street Address*" : "Hospital Address*"}</label>
                        <input type="text" className="form-control" id="streetAddress" placeholder="Street number, Street name" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter address in format: Street number and Street name
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City*</label>
                        <input type="text" className="form-control" id="city" placeholder="Please enter a city name" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter a valid city
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zipcode*</label>
                        <input type="text" className="form-control" id="zipcode" placeholder="Please enter a zipcode" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter a valid zip
                        </div>
                    </div>
                    {
                        userRole === "patient"
                        &&
                        <>
                            <div className="form-group">
                                <label htmlFor="individualMembership" className="mx-2 ml-0">Subscription Type: </label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="subscriptionType" id="individualMembership"
                                        value="individual" required />
                                    <label className="form-check-label" htmlFor="individualMembership">Individual</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="subscriptionType" id="familyMembership" value="family" />
                                    <label className="form-check-label" htmlFor="familyMembership">Family</label>
                                </div>
                                <button type="button" className="btn btn-primary corporate-button" onClick={showToast}>Corporate Plans?</button>
                                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                                    <div id="liveToast" className="toast hide corporate-toast" role="alert" aria-live="assertive"
                                        aria-atomic="true">
                                        <div className="toast-header">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Square_blue.svg" className="rounded me-2"
                                                alt="Blue square" style={{ width: 1 + "rem", height: 1 + "rem" }} />
                                            <strong className="me-auto">Pied Piper</strong>
                                            <small>2s ago</small>
                                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                        </div>
                                        <div className="toast-body">
                                            Please contact us at <b>corporate@piedpiper.com</b> for more details
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group membership-plan-select">
                                <label htmlFor="membershipPlanSelect">Subscription Plan: </label>
                                <select className="form-control" id="membershipPlanSelect">
                                </select>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please select atleast one plan
                                </div>
                            </div>
                        </>
                    }
                    {
                        userRole === "doctor"
                        &&
                        <>
                            <div className="form-group">
                                <label htmlFor="hospitalName">Hospital Name*</label>
                                <input type="text" className="form-control" id="hospitalName" placeholder="Please enter a hospital name" />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter a valid hospital name
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialization">Specialization*</label>
                                <input type="text" className="form-control" id="specialization" placeholder="Please enter a specialization" />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter a valid specialization
                                </div>
                            </div>
                        </>
                    }    
                    {
                        signupErrorMessage !== ""
                        &&
                        <div className="alert alert-danger" role="alert">
                            {signupErrorMessage}
                        </div>
                    }
                    {
                        signupSuccess
                        &&
                        <div className="alert alert-success" role="alert">
                            Sign up successful. Please wait while you are being redirected to signin
                        </div>
                    }
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SubscribeForm;