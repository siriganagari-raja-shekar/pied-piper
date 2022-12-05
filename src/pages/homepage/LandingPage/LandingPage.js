import './LandingPage.scss';
import Header from '../../../components/homepage/Header/Header'
import Carousel from '../../../components/homepage/Carousel/Carousel';
import AboutUs from '../../../components/homepage/AboutUs/AboutUs';
import ServiceCards from '../../../components/homepage/ServiceCards/ServiceCards';
import Memberships from '../../../components/homepage/Memberships/Memberships';
import FAQ from '../../../components/homepage/FAQ/FAQ';
import Footer from '../../../components/homepage/Footer/Footer';


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