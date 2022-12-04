import "./SubscribeForm.scss";
import { useEffect } from "react";
import Toast from "../../../../node_modules/bootstrap/js/src/toast"

const SubscribeForm = () => {

    useEffect(() => {
        document.getElementById("subscribe-form").reset();
        document.querySelectorAll(".form-group").forEach(group => {
            group.classList.add("my-4");
        });

        var inputRegex = {
            nameRegex: "^\\w+\\s\\w+$",
            emailAddressRegex: "^[a-zA-Z0-9]+@\\w+.\\w{1,3}$",
            passwordRegex: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$" ,
            phoneNumberRegex: "^\\d{3}-\\d{3}-\\d{4}$",
            address1Regex: "^\\d{1,} [a-zA-Z0-9\\s]+$",
            address2Regex: "^[a-zA-Z0-9-#\\s]*$"
        }

        for (const key in inputRegex) {
            var currInputId = key.substring(0, key.indexOf("Regex"));
            var inputElement = document.getElementById(currInputId);
            inputElement.setAttribute("required", "required");
            inputElement.setAttribute("pattern", inputRegex[key]);
        }

        document.querySelectorAll("input[name='subscriptionType']").forEach(radio => {
            ;
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
    }, []);

    const formValidation = (event) => {
        var form = event.target;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
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
                        <label htmlFor="address1">Address 1*</label>
                        <input type="text" className="form-control" id="address1" placeholder="Street number, Street name" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter address in format: Street number and Street name
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address2">Address 2*</label>
                        <input type="text" className="form-control" id="address2" placeholder="Apartment or Unit name/number" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter address in format: Apartment or Unit number
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="individualMembership">Subscription Type: </label>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SubscribeForm;