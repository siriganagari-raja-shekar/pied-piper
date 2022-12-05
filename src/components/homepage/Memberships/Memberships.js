import './Memberships.scss';
import tickMarkPath from '../../../Assets/Images/circle-check-regular.svg';
const Memberships = () => {

    const getCardList = (listItemsContents) =>{
        const listElements = listItemsContents.map( listItemContent =>{
            return (
            <li>
                <img className="img-fluid" src={tickMarkPath} alt="Check mark"></img>
                {listItemContent}
            </li>
            );
        });
        return(
            <ul>
                {listElements}
            </ul>
        );
        
    }

    return (
        <div className="container-fluid w-75 section">
            <h1 id="membership-title" className="col text-center">Our membership plans <span></span></h1>
            <ul className="nav nav-pills mb-3 flex-row justify-content-center" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-personal-plan-tab" data-bs-toggle="pill"
                        data-bs-target="#personal-plan" type="button" role="tab" aria-controls="pills-personal-plan"
                        aria-selected="true">Personal Plans</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-family-plan-tab" data-bs-toggle="pill" data-bs-target="#family-plan"
                        type="button" role="tab" aria-controls="pills-family-plan" aria-selected="false">Family
                        Plans</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="personal-plan" role="tabpanel"
                    aria-labelledby="personal-plan-tab">
                    <div className="row justify-content-evenly ">
                        <div className="membership card bronze my-3 col-12 col-sm-6">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Bronze</h5>
                                <p className="my-0"><span className="membership-price ">$5</span>/mo</p>
                                <p>Billed Anually</p>
                                <a href="./subscribe.html"><button type="button"
                                    className="btn btn-outline-primary w-100 py-2">Subscribe</button></a>
                            </div>
                            <hr />
                            <div className="card-body">
                                {
                                    getCardList([
                                        "2 Appointments per month",
                                        "Emergency services",
                                        "Emergency Vaccinations",
                                        "Free Monthly Checkups",
                                        "Access to the healthboard"
                                    ])
                                }
                            </div>
                        </div>
                        <div className="membership card gold my-3 col-12 col-sm-6">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Gold</h5>
                                <p className="my-0"><span className="membership-price ">$10</span>/mo</p>
                                <p>Billed Anually</p>
                                <a href="./subscribe.html"><button type="button"
                                    className="btn btn-outline-primary w-100 py-2">Subscribe</button></a>
                            </div>
                            <hr />
                            <div className="card-body">
                                {
                                    getCardList([
                                        "4 Appointments per month",
                                        "Limited Insurance accepted",
                                        "2+ Free video consultaion",
                                        "Free vaccinations",
                                        "+All bronze perks"
                                    ])
                                }
                            </div>
                        </div>
                        <div className="membership card diamond my-3 col-12 col-sm-6">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Diamond</h5>
                                <p className="my-0"><span className="membership-price ">$15</span>/mo</p>
                                <p>Billed Anually</p>
                                <a href="./subscribe.html"><button type="button"
                                    className="btn btn-outline-primary w-100 py-2">Subscribe</button></a>
                            </div>
                            <hr />
                            <div className="card-body">
                                {
                                    getCardList([
                                        "8 Appointments per month",
                                        "All Insurance accepted",
                                        "4+ Free video consultaion",
                                        "Free Health alerts",
                                        "+All Gold perks"
                                    ])
                                }
                            </div>
                        </div>
                        <div className="membership card platinum my-3 col-12 col-sm-6">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Platinum <span className="badge badge-primary">Popular</span></h5>
                                <p className="my-0"><span className="membership-price ">$20</span>/mo</p>
                                <p>Billed Anually</p>
                                <a href="./subscribe.html"><button type="button"
                                    className="btn btn-outline-primary w-100 py-2">Subscribe</button></a>
                            </div>
                            <hr />
                            <div className="card-body">
                                {
                                    getCardList([
                                        "Unlimited Appointments",
                                        "Free inhouse Insurance",
                                        "Unlimited video consultaion",
                                        "Free Health alerts",
                                        "+All Diamond perks"
                                    ])
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade " id="family-plan" role="tabpanel" aria-labelledby="family-plan-tab">
                    <div className="row justify-content-evenly">
                        <div className="membership card  col-12 col-sm-6">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Basic</h5>
                                <p className="my-0"><span className="membership-price ">$5</span>/mo</p>
                                <p>Billed Anually</p>
                                <a href="./subscribe.html"><button type="button"
                                    className="btn btn-outline-primary w-100 py-2">Subscribe</button></a>
                            </div>
                            <hr />
                            <div className="card-body">
                                {
                                    getCardList([
                                        "8 Appointments per month",
                                        "All Insurance accepted",
                                        "4+ Free video consultaion",
                                        "Free Health alerts",
                                        "Free vaccinations"
                                    ])
                                }
                            </div>
                        </div>
                        <div className="membership card  col-12 col-sm-6">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Premium</h5>
                                <p className="my-0"><span className="membership-price ">$10</span>/mo</p>
                                <p>Billed Anually</p>
                                <a href="./subscribe.html"><button type="button"
                                    className="btn btn-outline-primary w-100 py-2">Subscribe</button></a>
                            </div>
                            <hr />
                            <div className="card-body">
                                {
                                    getCardList([
                                        "Unlimited Appointments",
                                        "Free inhouse insurance",
                                        "Unlimited video consultaion",
                                        "Free Health alerts",
                                        "Free vaccinations"
                                    ])
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Memberships;