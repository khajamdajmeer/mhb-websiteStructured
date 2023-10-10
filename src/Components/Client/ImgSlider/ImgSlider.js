import React,{useEffect, useState,useMemo, useRef} from 'react';
import './ImgSlider.css';
import img1 from "../imgClient/sliderimages/tech1.jpeg";
import img2 from "../imgClient/sliderimages/tech2.jpeg";
import img3 from '../imgClient/sliderimages/bg3.jpg'

const ImgSlider = () => {
    
  // let [slideIndex,setSlideIndex] = useState(0);
  //   useEffect(() => {
    
  //       const slideshow = () => {
  //         const slides = document.getElementsByClassName('myslides');
  //         for (let i = 0; i < slides.length; i++) {
  //           slides[i].style.display = "none";
  //         }
  //         slideIndex++;
  //         if (slideIndex > slides.length) {
  //           setSlideIndex(1);
  //         }
  //         slides[slideIndex - 1].style.display = "block";
  //         console.log(slideIndex-1)
  //         setTimeout(slideshow, 5000);
  //       }
    
  //       slideshow();
  //     }, []);
    
  const imgfilelocations = useMemo(() => [
    img1, img2, img1,img3
], []);
    const [index, setIndex] = useState(0);
    const [img, setImg] = useState(imgfilelocations[index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % imgfilelocations.length);
        }, 3000);

        // Cleanup the interval when the component unmounts or when the index changes
        return () => clearInterval(interval);
    }, [index, imgfilelocations]);

    useEffect(() => {
        setImg(imgfilelocations[index]);
    }, [index, imgfilelocations]);

    
    const inputnameRef = useRef(null);
    const handlescroolToBookNow =()=>{
      const bookingcontainer = document.getElementById('bookingContainer');
      if(bookingcontainer){
          bookingcontainer.scrollIntoView({behavior:'smooth'});
          if(inputnameRef.current){
              inputnameRef.current.focus();
          }
      }
  }

  return (
   <>
   <div className="slideshow-container" id='iamhome'>
        <div className="myslides fade">
     
          <img src={img} className='transition-fade show' alt="" />
          <div className="slidercenter">
            <div className="slidermiddle">MHB <span className="orangecolor"> AC </span> Repair &  <br />Services</div>
            <div className="slidertop">Your Comfort is Our Success</div>
            <div className="sliderbottom"><button onClick={handlescroolToBookNow} className="bookservice">Book a service</button></div>
          </div>
        </div>
        {/* <div className="myslides fade">
          <img src={img1} alt="" />
        </div>
        <div className="myslides fade">
          <img src={img2} alt="" />
        </div>
        <div className="myslides fade">
          <img src={img3} alt="" />
        </div> */}

        
      </div>
   </>
  );
}

export default ImgSlider;
