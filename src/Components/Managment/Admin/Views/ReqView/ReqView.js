import React from 'react';
import './ReqView.css'


const ReqView = (props) => {

    const closefunction = props.closefunction;
    
  return (
    <>
    <div className="ad-rdbv-fullscreen" >
       <div className="ad-rdbv-center">
        <h2 className="ad-rdbv-head">Request Details</h2>
        <div className="ad-rdbv-body">
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Name:</li>
                <li className='ad-rdbv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>MobileNumber:</li>
                <li className='ad-rdbv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Location:</li>
                <li className='ad-rdbv-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Address:</li>
                <li className='ad-rdbv-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Service Date:</li>
                <li className='ad-rdbv-liright'>{props.data.ServiceDate}</li>
            </ul>
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Service Type</li>
                <li className='ad-rdbv-liright'>{props.data.ServiceType}</li>
            </ul>
           
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Request Date:</li>
                <li className='ad-rdbv-liright'>{props.data.Requestdate.slice(0,10)}</li>
            </ul>
            
            <ul className='ad-rdbv-bodyul'>
                <li className='ad-rdbv-lileft'>Note:</li>
                <li className='ad-rdbv-liright'>{props.data.Note}</li>
            </ul>
            <button className='ad-rdbv-closebtn' onClick={closefunction}>Close</button>
        </div>
       </div>
    </div>
      
    </>
  );
}


export default ReqView;
