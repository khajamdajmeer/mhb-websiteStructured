import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <>
    <div className="mainfooter">
        <div className="c-footer-box">
           <h2>MHB AC Service & Repair</h2>
           <p>We provide Wide Range of Services for AC</p>
           <div className="c-footer-info">
           <span class="material-symbols-outlined">phone_in_talk</span>
           1122331122
           </div>
        </div>
        <div className="c-footer-box">
            <h2>Company</h2>
            <p>Hyderabad </p>
            <p>Dilshuknagar</p>
            <p>Tolichowki</p>
            
        </div>
        <div className="c-footer-box">
            <h2>Our Working Hours</h2>
            <h5>Mon - Fri: 9:00AM - 9:00PM</h5>
            <h5>Sat: 10:00AM - 6:00PM</h5>
            <h5>Sun:10:00AM - 4:00PM</h5>
        </div>
        {/* <div className="c-footer-box">this is 4</div> */}
    </div>
      
    </>
  );
}

export default Footer;
