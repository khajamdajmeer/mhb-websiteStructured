import React from 'react';
import Navbar from './Header/Navbar';
import ImgSlider from './ImgSlider/ImgSlider';
import AboutUs from './AboutUs/AboutUs';
import Request from './Request/Request';
import Footer from './Footer/Footer';
import ServicePricing from './ServicePricing/ServicePricing';
import WhyUs from './WhyUs/WhyUs';

const Home = () => {
  return (
   <>
   <Navbar/>
   <ImgSlider/>
   <Request/>
   <AboutUs/>
   <ServicePricing/>
   <WhyUs/>
   <Footer/>
   </>
  );
}

export default Home;
