import React from 'react';
import './DeleteView.css'


const DeleteView = (props) => {

    const closefunction = props.closefunction;
    
  return (
    <>
    <div className="ad-ddbv-fullscreen" >
       <div className="ad-ddbv-center">
        <h2 className="ad-ddbv-head"> Details</h2>
        <div className="ad-ddbv-body">
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Name:</li>
                <li className='ad-ddbv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>MobileNumber:</li>
                <li className='ad-ddbv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Location:</li>
                <li className='ad-ddbv-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Address:</li>
                <li className='ad-ddbv-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Manager Name:</li>
                <li className='ad-ddbv-liright'>{props.data.forworded.name}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Service Type</li>
                <li className='ad-ddbv-liright'>{props.data.ServiceType}</li>
            </ul>
           
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Request Date:</li>
                <li className='ad-ddbv-liright'>{props.data.Requestdate.slice(0,15)}</li>
            </ul>
            
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Reason:</li>
                <li className='ad-ddbv-liright'>{props.data.Deleted.reason}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Deleted Date:</li>
                <li className='ad-ddbv-liright'>{props.data.Deleted.Date.slice(0,15)}</li>
            </ul>
            
            <button className='ad-ddbv-closebtn' onClick={closefunction}>Close</button>
           
        </div>
       </div>
    </div>
      
    </>
  );
}




export default DeleteView;
