import "./../Assets/Styles/SubscribeForm.scss";

const SubscribeForm = () => {
    return (
        <div className="row justify-content-center my-5 form-container">
            <div className="col-10 col-sm-6">
                <form id="subscribe-form" className="needs-validation px-5 py-5" novalidate>
                    <h1 className="text-center mb-3">Subscription Form</h1>
                    <div className="form-group">
                        <label for="name">Name*</label>
                        <input type="text" className="form-control" id="name" placeholder="First name Last name" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter name in format: First name Last name
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="emailAddress">Email address*</label>
                        <input type="email" className="form-control" id="emailAddress" placeholder="name@example.com" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter name in format: name@example.com
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="phoneNumber">Phone number*</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="xxx-xxx-xxxx" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter phone number in format: xxx-xxx-xxxx
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="address1">Address 1*</label>
                        <input type="text" className="form-control" id="address1" placeholder="Street number, Street name" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter address in format: Street number and Street name
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="address2">Address 2*</label>
                        <input type="text" className="form-control" id="address2" placeholder="Apartment or Unit name/number" />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please enter address in format: Apartment or Unit number
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="individualMembership">Subscription Type: </label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="subscriptionType" id="individualMembership"
                                value="individual" required />
                            <label className="form-check-label" for="individualMembership">Individual</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="subscriptionType" id="familyMembership" value="family" />
                            <label className="form-check-label" for="familyMembership">Family</label>
                        </div>
                        <button type="button" className="btn btn-primary corporate-button">Corporate Plans?</button>
                        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
                            <div id="liveToast" className="toast hide corporate-toast" role="alert" aria-live="assertive"
                                aria-atomic="true">
                                <div className="toast-header">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Square_blue.svg" className="rounded me-2"
                                        alt="Blue square image" style={{width: 1 +"rem", height: 1 +"rem"}} />
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
                        <label for="membershipPlanSelect">Subscription Plan: </label>
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