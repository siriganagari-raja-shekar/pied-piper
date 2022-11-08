import './../Assets/Styles/ServiceCards.scss';
import appointmentsImg from './../Assets/Images/appointments.jpg';
import videoCallImg from './../Assets/Images/videocall.jpg';
import privacyImg from './../Assets/Images/privacy.jpg';
import searchDoctorImg from './../Assets/Images/search-doctor.png';

const ServiceCards = () => {
    return (
        <section id="team" className="section">
            <div className="container-fluid w-75 text-center">
                <div className="row">
                    <div className="col">
                        <h1 id="servicestitle">Our Services <span></span></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6 py-3 ">
                        <div className="card service-card">
                            <div className="card-body">
                                <img src={appointmentsImg} alt="" className="img-fluid rounded-circle w-50 mb-3" />
                                <h3>Appointments</h3>
                                <p>You can make doctor appointments using our tool. Manage and view the
                                    conversations anytime</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 py-3 ">
                        <div className="card service-card">
                            <div className="card-body">
                                <img src={videoCallImg} alt="" className="img-fluid rounded-circle w-50 mb-3" />
                                <h3>Video consultaion</h3>
                                <p>Connect with the highly talented doctors accross the globe and get your queries resolved
                                    within minutes</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 py-3 ">
                        <div className="card service-card">
                            <div className="card-body">
                                <img src={privacyImg} alt="" className="img-fluid rounded-circle w-50 mb-3" />
                                <h3>Encrypted History</h3>
                                <p>Your medical history is encrypted. Only you have the key to decrypt and share the data
                                    with doctors</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 py-3 ">
                        <div className="card service-card">
                            <div className="card-body">
                                <img src={searchDoctorImg} alt="" className="img-fluid rounded-circle p-4 w-50 mb-3" />
                                <h3>Search Doctors</h3>
                                <p>You can search for doctors with different specialization and make an appointment with
                                    them</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceCards;