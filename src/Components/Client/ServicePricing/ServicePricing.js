import React, { useState } from 'react';
import './ServicePricing.css';
import acimg from '../imgClient/ac-img.jpg';
import fridgeimg from '../imgClient/Fridge-img.jpg';
import washingimg from '../imgClient/washing-img.jpg';
import acrepairimg from '../imgClient/GeneralService.jpg';
import jetService from '../imgClient/jetservice.jpeg';
import foamservice from '../imgClient/foamservice.jpg'
const ServicePricing = () => {

    


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
    ]
    const FridgePricing = [
        {name:'Fridge General Service',
        price:400 ,
         discription:'Experience unmatched comfort year-round with our professional AC service. Our expert technicians ensure your air conditioning system runs efficiently, keeping your space cool and fresh. Stay worry-free and enjoy a perfectly climate-controlled environment, no matter the season.',
         image:acrepairimg},
        {name:'Fridge Water Jet Service',
        price:500 ,
         discription:'Elevate your ACs performance with our specialized AC water jet service. Our skilled technicians employ high-pressure water jet technology to clean and unclog your systems vital components, ensuring optimal cooling efficiency. Say goodbye to AC troubles and hello to a refreshingly cool home or workspace.',
         image:acrepairimg},
        {name:'Fridge Water Jet With Foam Service',
        price:800 , 
        discription:'800 Experience unmatched comfort year-round with our professional AC service. Our expert technicians ensure your air conditioning system runs efficiently, keeping your space cool and fresh. Stay worry-free and enjoy a perfectly climate-controlled environment, no matter the season.',image:acrepairimg},
    ]

    const WashingMachinePricing = [
        {name:'Washing Machine General Service',
        price:400 ,
         discription:'Experience unmatched comfort year-round with our professional AC service. Our expert technicians ensure your air conditioning system runs efficiently, keeping your space cool and fresh. Stay worry-free and enjoy a perfectly climate-controlled environment, no matter the season.',
         image:acrepairimg},
        {name:'Washing Machine Water Jet Service',
        price:500 ,
         discription:'Elevate your ACs performance with our specialized AC water jet service. Our skilled technicians employ high-pressure water jet technology to clean and unclog your systems vital components, ensuring optimal cooling efficiency. Say goodbye to AC troubles and hello to a refreshingly cool home or workspace.',
         image:acrepairimg},
        {name:'Washing Machine Water Jet With Foam Service',
        price:800 , 
        discription:'800 Experience unmatched comfort year-round with our professional AC service. Our expert technicians ensure your air conditioning system runs efficiently, keeping your space cool and fresh. Stay worry-free and enjoy a perfectly climate-controlled environment, no matter the season.',image:acrepairimg},
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
                 <h2>Price <span className="">&#8377; {ShowingList[myindex].price} </span> </h2>
                 <div className="service-info-content"> 
                {ShowingList[myindex].discription}
                 </div>
                 <button>Book Now</button>
            </div>
        </div>
    </div>
      
    </>
  );
}

export default ServicePricing;
