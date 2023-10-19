import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <>
    <div className="mainfooter" id='iamfooter'>
        <div className="c-footer-box">
           <h2>MHB AC Service & Repair</h2>
           <p>We provide Wide Range of Services for AC</p>
           <div className="c-footer-info"   >
           <span class="material-symbols-outlined">phone_in_talk</span>
           <a  href='tel:8686303089' style={{color:'var(--primary)'}}>8686303089</a>
           
           </div>
           <div className="c-footer-info" style={{textDecoration:'none'}} >
           <span class="material-symbols-outlined">phone_in_talk</span>
           <a href='tel:8919168521' style={{color:'var(--primary)'}}>8919168521</a>
           
           </div>
           <div className="c-footer-info">
           <span class="material-symbols-outlined">mail</span>
mhbmech326@gmail.com
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
            <h5>Sat-sun: 10:00AM - 8:00PM</h5>
        </div>
        {/* <div className="c-footer-box">this is 4</div> */}
    </div>
      
    </>
  );
}

export default Footer;
