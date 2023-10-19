import React from 'react';
import './WhyUs.css';
import pricetag from '../imgClient/navlogo/priceTag.jpg';
import qualitytag from '../imgClient/navlogo/QualityTag.jpg';
import warrenttag from '../imgClient/navlogo/Warrentytag.jpg'
const WhyUs = () => {


    const handleCheckPricing = ()=>{
        const pricingelement = document.getElementById('iamPricing');
        if(pricingelement){
            pricingelement.scrollIntoView({behavior:'smooth'})
        }
    }

  return (
    <>
    <div className="why-us-container">
        <div className="why-center">
            <div className="why-center-left"> 
                <h3>Why Choose MHB?</h3>
                <h2>Best valued deals you will ever find</h2>
                <p>Discover the Best deals You'll ever find with our unbeatable Pricing.
                    We're dedicated to provide you with the best value for your money. we're your trusted choice for AC repairs and services. With a commitment to excellence, our skilled technicians deliver top-notch solutions to keep your cooling systems running efficiently. We take pride in our reliability, quality workmanship, and 24/7 support. Choose us for a refreshing and worry-free AC experience. 
                </p>
    <button onClick={handleCheckPricing}>Check Pricing</button>

            </div>
            <div className="why-center-right">
                <div className="why-tags">
                <img src={pricetag} alt="" />
                <div className="why-content">

                    <h2> Best Pricing</h2>
                    <p>"Experience transparent and budget-friendly upfront pricing with us. Your satisfaction is our priority  no hidden costs, just honest service."</p>
                </div>
                </div>
                <div className="why-tags">
                    <img src={qualitytag} alt="" />
                    <div className="why-content">
                        <h2>Quality Service</h2>
                        <p>"Exceptional quality service you can trust. Our experts ensure your comfort with precision and care. Your satisfaction, our guarantee."</p>
                    </div>
                </div>
                <div className="why-tags">
                    <img src={warrenttag} alt="" />
                    <div className="why-content">
                        <h2>Service Warrenty</h2>
                        <p>Peace of mind with our service warranty. We stand by our work, offering protection and reliability beyond the repair.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
  );
}

export default WhyUs;
