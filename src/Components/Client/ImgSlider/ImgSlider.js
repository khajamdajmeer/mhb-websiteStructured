import React,{useEffect, useState} from 'react';
import './ImgSlider.css';
import img1 from "../imgClient/sliderimages/tech1.jpeg";
import img2 from "../imgClient/sliderimages/tech2.jpeg";
import img3 from '../imgClient/sliderimages/bg3.jpg'

const ImgSlider = () => {
    
  let [slideIndex,setSlideIndex] = useState(0);
    useEffect(() => {
    
        const slideshow = () => {
          const slides = document.getElementsByClassName('myslides');
          for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          slideIndex++;
          if (slideIndex > slides.length) {
            setSlideIndex(1);
          }
          slides[slideIndex - 1].style.display = "block";
          console.log(slideIndex-1)
          setTimeout(slideshow, 5000);
        }
    
        slideshow();
      }, []);
    



  return (
   <>
   <div className="slideshow-container">
        <div className="myslides fade">
          <img src={img1} alt="" />
          <div className="slidercenter">
            <div className="slidertop">We are master of Servicies</div>
            <div className="slidermiddle">MHB <span className="orangecolor">Service</span>  <br />Provider</div>
            <div className="sliderbottom"><button className="bookservice">Book a service</button></div>
          </div>
        </div>
        <div className="myslides fade">
          <img src={img1} alt="" />
        </div>
        <div className="myslides fade">
          <img src={img2} alt="" />
        </div>
        <div className="myslides fade">
          <img src={img3} alt="" />
        </div>

        
      </div>
   </>
  );
}

export default ImgSlider;
