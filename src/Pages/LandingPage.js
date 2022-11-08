import './../Assets/Styles/LandingPage.scss';
import Header from '../Components/Header';
import Carousel from '../Components/Carousel';
import AboutUs from '../Components/AboutUs';
import ServiceCards from '../Components/ServiceCards';
import Memberships from '../Components/Memberships';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';


const LandingPage = () =>{

    return(
        <>
            <Header />
            <Carousel />
            <ServiceCards />
            <AboutUs />
            <Memberships />
            <FAQ />
            <Footer />
        </>
    )
}

export default LandingPage;