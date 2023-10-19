import React, { useState } from 'react';
import './AdminMa.css';
import threedots from '../../../images and tones/3dot.png';
import ViewRequest from '../../Manager/ViewRequest/ViewRequest';
import PendingPage from '../../Manager/PendingPage/PendingPage';
import ViewTechreq from '../../Manager/ViewTechreq/ViewTechreq';
import ReviewReq from '../../Manager/ReviewReq/ReviewReq';
import ComplainPage from '../../Manager/ComplainPage/ComplainPage' ;

const AdminMa = () => {




  //handling the wrap button 3dots
  const handlewrapbtn = ()=>{
    const item = document.getElementById('wrapitem-adma')
    if(item.style.display==='none'){
      item.style.display='block'
    }
    else{
      item.style.display='none'
    }
  }


  const [renderpage,setRenderpage]=useState('request')
  const handlerenderpage = (name)=>{
    setRenderpage(name)

  }

  return (
    <>
 
    <div className="ad-ma-navright"><button onClick={handlewrapbtn}><img src={threedots} alt="" /></button></div>
    <div className="ad-ma-navboxopen" id='wrapitem-adma'>
      <div className="ad-ma-navul">
        <li><button onClick={()=>handlerenderpage('request')}>Requests</button></li>
        <li><button onClick={()=>handlerenderpage('pendingpage')}>PendingPage</button></li>
        <li><button onClick={()=>handlerenderpage('techRequest')}>Tech Request</button></li>
        <li><button onClick={()=>handlerenderpage('ReviewReq')}>Review Request</button></li>
        {/* <li><button onClick={()=>handlerenderpage('ComplainPage')}>ComplainPage</button></li> */}
      </div>
    </div>
    {renderpage==='request'&&<ViewRequest/>}
    {renderpage==='pendingpage'&&<PendingPage/>}
    {renderpage==='techRequest'&&<ViewTechreq/>}
    {renderpage==='ReviewReq'&&<ReviewReq/>}
    {renderpage==='ComplainPage'&&<ComplainPage/>}
      
    </>
  );
}

export default AdminMa;
