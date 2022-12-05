import './Carousel.scss';
import fbIcon from "../../../Assets/Images/icons8-facebook-500.png";
import instagramIcon from "../../../Assets/Images/icons8-instagram-500.png";
import twitterIcon from "../../../Assets/Images/icons8-twitter-500.png";
import carouselImageOne from "../../../Assets/Images/carousel-image-1.jpg";
import carouselImageTwo from "../../../Assets/Images/carousel-image-2.jpg";
import carouselImageThree from "../../../Assets/Images/carousel-image-3.jpg";


const Carousel = () =>{

    return(
        <div className="row section m-5">
            <div className="col-12 col-xxl-6">
                <div id="carousel-main" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carousel-main" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel-main" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel-main" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={carouselImageOne} className="d-block w-100 rounded img-fluid" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Renowed Doctors</h5>
                                <p>You are in care of award-winning doctors and techinicians</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImageTwo} className="d-block w-100 rounded img-fluid" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>High-tech infrastructure</h5>
                                <p>Testing laboratories with pin-point accuracy testing machines</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImageThree} className="d-block w-100 rounded img-fluid" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Exceptional Surgeons</h5>
                                <p>Surgeons with highest success rate</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-main"
                        data-bs-slide="prev">
                        <div className="carousel-icon-holder">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </div>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-main"
                        data-bs-slide="next">
                        <div className="carousel-icon-holder">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="col-12 col-xxl-6 my-5 d-flex flex-column align-items-center justify-content-center">
                <div className="my-2 my-sm-0">
                    <p className="d-inline fs-1 text-primary fw-bolder">One Stop</p>
                    <p className="d-inline fs-1">&nbsp;For All Your Health Needs!!</p>
                </div>
                <div className="my-2 my-sm-0">
                    <p className="d-inline fs-5 text-primary fw-bold">Safeguard your future</p>
                    <p className="d-inline fs-5">&nbsp;with our curated health plans and world className service</p>
                </div>
                <div className="social-media-icons my-2 my-sm-0">
                    <img src={fbIcon} alt="Facebook icon" className="img-fluid" />
                    <img src={instagramIcon} alt="Instagram icon" className="img-fluid" />
                    <img src={twitterIcon} alt="Twitter icon" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default Carousel;