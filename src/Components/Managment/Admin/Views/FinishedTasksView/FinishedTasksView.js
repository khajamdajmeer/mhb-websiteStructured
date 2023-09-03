import React from 'react';

//the css for this component is inherited from the pendingtaskview.css


const FinishedTasksView = (props) => {
  return (
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
         <ul className='ad-ptv-bodyul'>
             <li className='ad-ptv-lileft'>Update:</li>
             <li className='ad-ptv-liright'>{props.data.Task}</li>
         </ul>
         <button className='ad-ptv-closebtn' onClick={props.closefunction}>Close</button>
     </div>
    </div>
 </div>
  );
}

export default FinishedTasksView;
