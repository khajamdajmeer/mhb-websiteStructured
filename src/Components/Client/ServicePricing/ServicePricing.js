import React, { useState } from 'react';
import './ServicePricing.css';
import acimg from '../imgClient/ac-img.jpg';
import fridgeimg from '../imgClient/Fridge-img.jpg';
import washingimg from '../imgClient/washing-img.jpg';
import acrepairimg from '../imgClient/GeneralService.jpg';
import jetService from '../imgClient/jetservice.jpeg';
import foamservice from '../imgClient/foamservice.jpg';
import acgaschanging from '../imgClient/acgascharge.jpg';
import acinstallation from '../imgClient/ac-installation.jpg';
import acadvance from '../imgClient/acadvancepiping.jpeg';
import acdismantile from '../imgClient/AC-Dismantling.jpg';
import fidgeservice from '../imgClient/fridgeservice.jpg';
import fridgeRepair from '../imgClient/fridge-repair-service-about-us.png';
import fridgegascharge from '../imgClient/acGasCharging.jpg';
import washerrepair from '../imgClient/washerRepair.jpg';
import washerservice from '../imgClient/washierserviceimg.jpg';
import washerpcb from '../imgClient/washerpcb.jpg';
const ServicePricing = () => {

    
const handleBookNow = ()=>{
    const booknow = document.getElementById('bookingContainer')
    if(booknow){
        booknow.scrollIntoView({behavior:'smooth'})
    }
}

    const AcPricing = [
        {name:'Ac General Service',
        price:399 ,
         discription:'Experience unmatched comfort year-round with our professional AC service. Our expert technicians ensure your air conditioning system runs efficiently, keeping your space cool and fresh. Stay worry-free and enjoy a perfectly climate-controlled environment, no matter the season.',
         image:acrepairimg},
        {name:'Ac Water Jet Service',
        price:499 ,
         discription:'Elevate your ACs performance with our specialized AC water jet service. Our skilled technicians employ high-pressure water jet technology to clean and unclog your systems vital components, ensuring optimal cooling efficiency. Say goodbye to AC troubles and hello to a refreshingly cool home or workspace.',
         image:jetService},
        {name:'Ac Water Jet With Foam Service',
        price:599 , 
        discription:'Elevate your ACs performance With Foam Water jet to get 2X deeper dust removal with foamjet technology. Our skilled technicians employ high-pressure water jet technology to clean and unclog your systems vital components, ensuring optimal cooling efficiency. Say goodbye to AC troubles and hello to a refreshingly cool home or workspace.',image:foamservice},
        {name:'Ac Gas Charging',
        price:'' ,
         discription:"Elevate your indoor comfort with our AC Gas Charging services. Our skilled technicians expertly replenish your air conditioner with top-grade refrigerants, ensuring optimal cooling performance. We're committed to keeping your space comfortable all year round, and our affordable, reliable maintenance will help you beat the heat with ease.",
         image:acgaschanging},
         {name:'Ac Installation',
         price:1499 ,
          discription:'Experience the ultimate in home comfort with our AC Installation service. Our skilled technicians will efficiently install your air conditioner, ensuring a seamless and reliable cooling system that will keep you comfortable year-round',
          image:acinstallation},
          {name:'Ac Shifting',
          price:2299 ,
           discription:"Relocating your air conditioner? Count on our AC Shifting services for a smooth transition. Our skilled team ensures safe disassembly, transportation, and reinstallation, preserving your system's integrity and ensuring continued cooling comfort in your new space.",
           image:acdismantile},
           {name:'AC Advance Piping',
          price:'' ,
           discription:"Experience superior air conditioning performance with our AC Advanced Piping expertise. Our meticulous installation of advanced piping ensures optimal refrigerant flow, enhancing efficiency and cooling capabilities. Trust us to create a more comfortable and energy-efficient environment in your space.",
           image:acadvance},
    ]
    const FridgePricing = [
        {name:'Refrigerator Servicing',
        price:'' ,
         discription:'Revitalize your refrigerators performance with our Refrigerator Servicing. Our skilled technicians meticulously inspect, clean, and fine-tune your appliance, ensuring it runs efficiently, keeps food fresher, and extends its lifespan. Trust us for expert fridge care.',
         image:fidgeservice},
        {name:'Refrigerator Gas Charging',
        price:'' ,
         discription:'Optimize your refrigerators cooling efficiency with our Refrigerator Gas Charging service. Our skilled technicians use high-quality refrigerants to replenish your system, ensuring consistent temperature control for longer-lasting freshness and energy savings.',
         image:fridgegascharge},
        {name:'Refrigerator Repairing',
        price:'' , 
        discription:'Is your fridge on the fritz? Our Refrigerator Repair service has you covered. Our expert technicians quickly diagnose and fix any issues, ensuring your fridge is back to keeping your food fresh and your kitchen running smoothly.',image:fridgeRepair},
    ]

    const WashingMachinePricing = [
        {name:'Washing Machine Service',
        price:'' ,
         discription:"Experience the ultimate care for your washing machine with our comprehensive Washing Machine Servicing. Our skilled technicians provide a thorough inspection, deep cleaning, and necessary maintenance, ensuring peak performance and prolonging your appliance's life.",
         image:washerservice},
        {name:'Washing Machine Repair',
        price:'' ,
         discription:"Is your washing machine acting up? Trust our experts for Washing Machine Repairs. Our skilled technicians swiftly diagnose issues and provide effective solutions, ensuring your appliance operates smoothly and your laundry routine stays hassle-free.",
         image:washerrepair},
         {name:'Washing Machine PCB',
         price:'' ,
          discription:"For reliable Washing Machine PCB Repair, turn to us. Our skilled technicians specialize in fixing circuit board issues, ensuring your washing machine functions flawlessly. Count on our expertise to get your appliance back in action.",
          image:washerpcb},
       
    ]
    const [ShowingList,setShowingList]=useState(AcPricing)
    const [myindex,setMyindex]=useState(0);
    const [itemtype,setItemType] =useState('AC');
    const handleItemChange =(item)=>{
        setItemType(item);
        setMyindex(0);
        if(item==='AC')setShowingList(AcPricing);
        else if(item==='FRIDGE')setShowingList(FridgePricing);
        else if(item==='WASHING Machine')setShowingList(WashingMachinePricing)
    }
    const handleIndexChange = (index)=>{
        setMyindex(index)
        console.log(index)
    }


  return (
    <>
    <div className="service-container" id='iamPricing'>
        <h2 className='pricing-heading'>Our Services & Pricing</h2>
        <div className="myservice-type">
            <div className="ac-type types" onClick={()=>handleItemChange('AC')}>
                <img src={acimg} alt="" />
                <div className={`type-absolute ${itemtype==='AC' ?'fullopacity':'noneopactiy'}`}>Air Conditioner Pricing</div>
            </div>
            <div className="fridge-type types" onClick={()=>handleItemChange('FRIDGE')}>
                <img src={fridgeimg} alt="" />
                <div className={`type-absolute ${itemtype==='FRIDGE' ?'fullopacity':'noneopactiy'}`}>Refrigerator</div>

            </div>
            <div className="washing-type types" onClick={()=>handleItemChange('WASHING Machine')}>
                <img src={washingimg} alt="" />
                <div className={`type-absolute ${itemtype==='WASHING Machine' ?'fullopacity':'noneopactiy'}`}>Washing Machine</div>

            </div>
        </div>
        <div className="service-box">
            <div className="service-list">
                {ShowingList.map((ele,index)=>{
                    return(
                        <button className={`a ${myindex===index ?'hovereffect':''}`} onClick={()=>handleIndexChange(index)}>{ele.name}</button>
                        )
})
                }
            </div>
            <div className="service-img">
                <img src={ShowingList[myindex].image} alt="" />
            </div>
            <div className="service-info">
                {ShowingList[myindex].price>10 ? <h2 >Price <span className="">&#8377; {ShowingList[myindex].price} </span> </h2>:''}
                

            
            <h3 className={` ${ShowingList[myindex].price<10 ?'bgblue':''}`}>{ShowingList[myindex].name}</h3>
                 <div className="service-info-content"> 
                {ShowingList[myindex].discription}
                 </div>
                 <button onClick={handleBookNow}>Book Now</button>
            </div>
        </div>
    </div>
      
    </>
  );
}

export default ServicePricing;
