import React from 'react';
import './AboutUs.css';
import aboutimg from '../imgClient/about.png'
import aclogo from '../imgClient/AC LOGO.png'
const AboutUs = () => {
  return (
    <>

    <div className="c-about-container">
      <div className="c-about-center">
        <div className="c-about-left">
          <h3 className='about-heading'>About Us</h3>
          <h2 className='about-subheading'>5 Years of Experience in Giving Best 
          <span className='about-orange'> Service</span></h2>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">check</span></div>
            <h3>Best Quality Service</h3>
          </div>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">check</span></div>
            <h3>Warrenty & Maintainence</h3>
          </div>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">check</span></div>
            <h3>Experienced Technician</h3>
          </div>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">check</span></div>
            <h3>Fast Service</h3>
          </div>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">check</span></div>
            <h3>Best Quality Service</h3>
          </div>



        </div>
        <div className="c-about-right">
          <img src={aboutimg} alt="" />
        </div>
      </div>
    </div>
    <div className="c-aboutcard-container">
      <div className="c-aboutcard-center">
      <div className="c-cardbody">
        <div className="c-card-logo">
            <img src={aclogo} alt="" />
            <h2>Regular Ac Service</h2>
            <p>We Use Water Jet Motor for Servicing of  Air Conditioner. Ensuring Dust Free Air Flow </p>
            <button>Book Now</button>
          </div>
        </div><div className="c-cardbody">
        <div className="c-card-logo">
            <img src={aclogo} alt="" />
            <h2>Regular Ac Service</h2>
            <p>We Use Water Jet Motor for Servicing of  Air Conditioner. Ensuring Dust Free Air Flow </p>
            <button>Book Now</button>
          </div>
        </div><div className="c-cardbody">
        <div className="c-card-logo">
            <img src={aclogo} alt="" />
            <h2>Regular Ac Service</h2>
            <p>We Use Water Jet Motor for Servicing of  Air Conditioner. Ensuring Dust Free Air Flow </p>
            <button>Book Now</button>
          </div>
        </div><div className="c-cardbody">
        <div className="c-card-logo">
            <img src={aclogo} alt="" />
            <h2>Regular Ac Service</h2>
            <p>We Use Water Jet Motor for Servicing of  Air Conditioner. Ensuring Dust Free Air Flow </p>
            <button>Book Now</button>
          </div>
        </div>
      </div>
    </div>



    </>
  );
}

export default AboutUs;
