import React from 'react';
import './View.css';


const View = (props) => {

    const closefunction = props.closefunction;


    return (
    <>
    <div className="ma-ddbv-fullscreen" >
       <div className="ma-ddbv-center">
        <h2 className="ma-ddbv-head"> Details</h2>
        <div className="ma-ddbv-body">
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Name:</li>
                <li className='ma-ddbv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>MobileNumber:</li>
                <li className='ma-ddbv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Location:</li>
                <li className='ma-ddbv-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Address:</li>
                <li className='ma-ddbv-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Manager Name:</li>
                <li className='ma-ddbv-liright'>{props.data.forworded.name}</li>
            </ul>
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Service Type</li>
                <li className='ma-ddbv-liright'>{props.data.ServiceType}</li>
            </ul>
           
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Request Date:</li>
                <li className='ma-ddbv-liright'>{props.data.Requestdate.slice(0,15)}</li>
            </ul>
            
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Reason:</li>
                <li className='ma-ddbv-liright'>{props.data.Deleted.reason}</li>
            </ul>
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-lileft'>Deleted Date:</li>
                <li className='ma-ddbv-liright'>{props.data.Deleted.Date.slice(0,15)}</li>
            </ul>
           
            <ul className='ma-ddbv-bodyul'>
                <li className='ma-ddbv-bodyul'>
                <button className='ma-ddbv-closebtn' onClick={closefunction}>Close</button>
                </li>
              
            </ul>
           
        </div>
       </div>
    </div>
      
    </>
  );
}






export default View;
