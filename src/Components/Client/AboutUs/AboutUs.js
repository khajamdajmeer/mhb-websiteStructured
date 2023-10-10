import React from 'react';
import './AboutUs.css';
import aboutimg from '../imgClient/about.png'
const AboutUs = () => {
  return (
    <>

    <div className="c-about-container" id='iamabout'>
      <div className="c-about-center">
        <div className="c-about-left">
          <h3 className='about-heading'>About Us</h3>
          <h2 className='about-subheading'>10 Years of Experience in Giving Best 
          <span className='about-orange'> Service</span></h2>
          <p className='justifytext'>
          Celebrating a decade of excellence in AC repair and services. Our journey has been powered by expertise, dedication, and your comfort.
          Our commitment to excellence has kept homes and businesses cool and comfortable. We take pride in our skilled technicians, quality workmanship, and unwavering dedication to your indoor comfort.
          </p>
          <div className="about-alltags">

          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">verified_user</span></div>
            <h3>Best Quality Service</h3>
          </div>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">verified</span></div>
            <h3>Warrenty & Maintainence</h3>
          </div>
          <div className="about-tags">
            <div className="tick"><span class="material-symbols-outlined">construction</span></div>
            <h3>Experienced Technician</h3>
          </div>
          </div>



        </div>
        <div className="c-about-right">
          <img src={aboutimg} alt="" />
        </div>
      </div>
    </div>

<div className="hrquote">
  <h2>"Stay cool and save big with our affordable <span className='about-orange'>AC repair and service </span>"</h2>
  <h4>Top-notch technicians. Local expertise. <span className='about-orange'>24/7</span>  support.</h4>
</div>


    {/* <div className="c-aboutcard-container" id='iamservice'>
      <h2 className='serviceheading'>Our Services</h2>
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
            <img src={storelogo} alt="" />
            <h2>Comarcial Anual Maintainence</h2>
            <p>We Use Water Jet Motor for Servicing of  Air Conditioner. Ensuring Dust Free Air Flow </p>
            <button>Book Now</button>
          </div>
        </div>
      </div>
    </div> */}



    </>
  );
}

export default AboutUs;
