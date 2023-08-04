import React from 'react';
import Navbar from './Header/Navbar';
import ImgSlider from './ImgSlider/ImgSlider';
import AboutUs from './AboutUs/AboutUs';
import Request from './Request/Request';

const Home = () => {
  return (
   <>
   <Navbar/>
   <ImgSlider/>
   <AboutUs/>
   <Request/>
   
   </>
  );
}

export default Home;
