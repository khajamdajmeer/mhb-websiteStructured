import React from 'react';
import adimg from "../imgClient/about.png"
import "./AboutUs.css"

const AboutUs = () => {
  return (
    <>
    <div className="aboutcontainer">
      <div className="containercenter">
        <div className="centerleft center-sides">
          <div className="abouthead">
            AboutUs
          </div>
          <div className="aboutdiscription">
            5 years of expereance in giving best <span className='orangecolor'>services</span>
          </div>
          <div className="aboutquality">
            <span className="tickbackground"> &#x2713;</span>Best quality sevice
          </div>
          <div className="aboutquality">
            <span className="tickbackground"> &#x2713;</span>Warrenty & Maintainence
          </div>
          <div className="aboutquality">
            <span className="tickbackground"> &#x2713;</span>
            Expereanced Technicians
          </div>
          <div className="aboutquality">
            <span className="tickbackground"> &#x2713;</span>
            Fast Service
          </div>
          <div className="aboutquality">
            <span className="tickbackground"> &#x2713;</span>
            Fast Service 1
          </div><div className="aboutquality">
            <span className="tickbackground"> &#x2713;</span>
            Fast Service 2
          </div>
        </div>
        <div className="centerright center-sides">
          <img src={adimg} alt="" />
        </div>
      </div>
    </div>

  </>
  );
}

export default AboutUs;
