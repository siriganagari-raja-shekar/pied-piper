import './AboutUs.scss';
import doctorImage from '../../../Assets/Images/doctor2.png';

const AboutUs = () => {

    return (
        <div className="container-fluid w-75 aboutus section">
            <h1 id="aboutustitle">About Us<span></span></h1>
            <div className="row">
                <div className="col-xxl-6">
                    <h1>Quality health starts with Quality Doctors</h1>
                    <p className="aboutp">
                        Locally owned, not-for-profit and nationally recognized, Freeman <br />
                        Health System includes
                        <br />
                        <br />
                        Freeman Hospital West, Freeman Hospital East <br />
                        Freeman Neosho center and Ozark center - the area's <br />
                        largest provider of behavioural health services.
                        <br />
                    </p>

                    <p className="aboutp">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-check-lg text-primary" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> We practice medicine that is historical
                        <br />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-check-lg text-primary" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> We have access to amazing treatments
                        <br />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-check-lg text-primary" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> We are accessible 24/7
                    </p>

                </div>
                <div className="col-xxl-6 bg-image hover-zoom">
                    <img src={doctorImage} className="img-thumbnail" alt="Doctor" />
                </div>
            </div>
        </div>
    );
}

export default AboutUs;