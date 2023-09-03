import React from 'react';
import './PendingTaskView.css'

const PendingTaskView = (props) => {

    const closefunction = props.closefunction;
    
  return (
    <>
    <div className="ad-ptv-fullscreen" >
       <div className="ad-ptv-center">
        <h2 className="ad-ptv-head">Request Details</h2>
        <div className="ad-ptv-body">
            <ul className='ad-ptv-bodyul'>
                <li className='ad-ptv-lileft'>Name:</li>
                <li className='ad-ptv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ad-ptv-bodyul'>
                <li className='ad-ptv-lileft'>MobileNumber:</li>
                <li className='ad-ptv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ad-ptv-bodyul'>
                <li className='ad-ptv-lileft'>Task Date:</li>
                <li className='ad-ptv-liright'>{props.data.Date.slice(0,10)}</li>
            </ul>
            <ul className='ad-ptv-bodyul'>
                <li className='ad-ptv-lileft'>Task:</li>
                <li className='ad-ptv-liright'>{props.data.Task}</li>
            </ul>
            <button className='ad-ptv-closebtn' onClick={closefunction}>Close</button>
        </div>
       </div>
    </div>
      
    </>
  );
}



export default PendingTaskView;
