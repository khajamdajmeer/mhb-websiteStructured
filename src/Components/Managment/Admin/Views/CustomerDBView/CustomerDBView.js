import React, { useState } from 'react';
import './CustomerDBView.css';
import ClientView from '../../ClientView/ClientView';

const CustomerDBView = (props) => {

    const closefunction = props.closefunction;
  const hdata = props.history;
  const [showview,setShowview]=useState(false)
  const [viewdata,setViewdata]=useState({});
  const closeview = ()=>{
    setShowview(false);
  }
  const handleview = (data)=>{
    setShowview(true)
    setViewdata(data);


  }
    
    
  return (
    <>
{showview&&<ClientView closefunction={closeview} data={viewdata}/>}
    <div className="ad-cdbv-fullscreen" >
       <div className="ad-cdbv-center">
        <h2 className="ad-cdbv-head">Customer Details</h2>
            <ul className='ad-cdbv-bodyul'>
                <li className='ad-cdbv-lileft'>{props.data.name}</li>
                <li className='ad-cdbv-liright'>{props.data.mobileNumber}</li>
            </ul>
        <div className="ad-cdbv-body">
          {hdata.reverse().map((ele,index)=>{
            return(
              <div className="ad-cdbv-mapitem">{index+1}
            <div className="ad-cdbv-item">{ele.Location}</div>
            <div className="ad-cdbv-item"> {ele.Address}</div>
            <div className="ad-cdbv-item "> {ele.Service.Delivery.slice(0,10)}</div>
            <div className="ad-cdbv-item"> {ele.Service.type}</div>
            <div className="ad-cdbv-viewbtn"> <button onClick={()=>handleview(ele)}>View</button></div>
          </div>

            )
          })}
        
          
            
           
        </div>
            <button className='ad-cdbv-closebtn' onClick={closefunction}>Close</button>
       </div>
    </div>
      
    </>
  );
}



export default CustomerDBView;
