import './../Assets/Styles/Footer.scss';

const Footer = () => {
    return (
        <div className="row container-fluid justify-content-evenly" id="footer">
            <div className="col-lg-3">
                <h2 className="navbar-brand">PiedPiper</h2>
                <hr />
                <p>PiedPiper is the distribution of health-related services and information via electronic
                    information and telecommunication technologies. It allows long-distance patient and
                    clinician contact, care, advice, reminders, education, intervention, monitoring, and remote
                    admissions</p>
            </div>
            <div className="col-lg-2">
                <h2>Subscriptions</h2>
                <hr />
                <ul>
                    <li>Personal Plan
                        <ul>
                            <li><a href="./subscribe.html">Bronze</a></li>
                            <li><a href="./subscribe.html">Gold</a></li>
                            <li><a href="./subscribe.html">Diamond</a></li>
                            <li><a href="./subscribe.html">Platinum</a></li>
                        </ul>
                    </li>
                    <li>Family Plan
                        <ul>
                            <li><a href="./subscribe.html">Basic</a></li>
                            <li><a href="./subscribe.html">Premium</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="col-lg-2">
                <h2>Useful Links</h2>
                <hr />
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./subscribe.html">Subscribe</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Enroll as a Doctor</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Signup</a></li>
                </ul>
            </div>
            <div className="col-lg-3">
                <h2>Subscribe to our Newsletter</h2>
                <hr />
                <form id="newsletter-form">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address &nbsp;
                            <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="top"
                                title="We'll never share your email with anyone else. Email is only used for sending brand new information about our tools and services">
                                ?
                            </button>
                        </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            pattern="^[a-zA-Z0-9]+@\\w+.\\w{1,3}$" required />

                    </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#submit-button">
                        Submit
                    </button>
                    <div className="modal fade" id="submit-button" tabIndex="-1" aria-labelledby="submit-buttonLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="submit-buttonLabel">News letter</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Successfully subscribed to our news letter.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Footer;

