import "./FAQ.scss";
import faqImg from "../../../Assets/Images/FAQ.png";

const FAQ = () => {
    return (
        <div className="container-fluid w-75 section" id="faq-block">
            <h1 id="faqtitle" className="col">Frequently Asked Questions <span></span></h1>
            <div className="row align-items-end justify-content-between">
                <div className="accordion col-lg-6" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                What is telemedic?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Telehealth is the distribution of health-related services and information via electronic
                                information and telecommunication technologies. It allows long-distance patient and
                                clinician contact, care, advice, reminders, education, intervention, monitoring, and remote
                                admissions
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                How is it different from other healthcare platforms?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Unlike many other platforms, the patient history in our platform is completely encrypted.
                                As a customer you have the right to share your medical history with the
                                doctors or hospitals as and when required. You need to use your 5 digit secure pin to
                                decrypt the data and send it to the doctor during the appointment. and the doctor or
                                hospital can access your history only during the appointment window time.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Do you offer free vaccinations?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                We offer free vaccinations to customers who subscribed to our diamond and platinum plans. We
                                give priority vaccinations to our customers so that they don't have to lookout for
                                vaccinations
                                elsewhere. Additionally, we offer vaccinations to customers family on a discounted price.
                                Vaccinations include all seasonal vaccines likes flu shots, Mandatory vaccines like MMR,
                                Tdap,
                                Hepatitis,..etc, and emergency vaccination are offered on a priotity
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Are there any students discounts?
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Do you accept third party health insurance?
                            </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faqimg col-5 align-self-center d-none d-lg-block">
                    <img className="img-fluid mx-auto d-block" src={faqImg} alt="FAQ" />
                </div>
            </div>
        </div>
    );
}

export default FAQ;