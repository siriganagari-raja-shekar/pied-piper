import './LandingPage.scss';
import Header from '../../../Components/Homepage/Header/Header'
import Carousel from '../../../Components/Homepage/Carousel/Carousel';
import AboutUs from '../../../Components/Homepage/AboutUs/AboutUs';
import ServiceCards from '../../../Components/Homepage/ServiceCards/ServiceCards';
import Memberships from '../../../Components/Homepage/Memberships/Memberships';
import FAQ from '../../../Components/Homepage/FAQ/FAQ';
import Footer from '../../../Components/Homepage/Footer/Footer';


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