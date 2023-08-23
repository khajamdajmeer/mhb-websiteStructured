import React, { useEffect, useState } from 'react';
import './PendingPage.css'
import { getPendingReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import PendingView from '../PendingView/PendingView';

const PendingPage = () => {
  const [data,setData]=useState([])
  const onMount =async()=>{
    const res = await getPendingReq();
    setData(res);
    console.log(res);

  }
  useEffect(()=>{
    onMount();
  },[])

  //  LOGIC FOR RENDERING THE PENDING VIEW
  const [showpview,setShowpview]=useState(false)
  const [pviewdata,setPviewdata]=useState('')
  const handlePView =(ele)=>{
    setShowpview(true);
    setPviewdata(ele);
  }
  const closepview = ()=>{
    setShowpview(false)
    onMount();
  }

  return (
    <>
    {showpview&&(
      <PendingView data={pviewdata} closefunc = {closepview} />
    )}
    
     <div className="ma-pp-fullscreen">
      <div className="ma-pp-centerdiv">
        <div className="ma-pp-head">
          <h1>Pending Data</h1>
        </div>
        <div className="ma-pp-body">
     {
      data.map((ele,index)=>{
        return( <div className="ma-pp-mapitem">
        <div className="ma-pp-item-name">{ele.name.length>2 ? ele.name :'none'}</div>
        <div className="ma-pp-item-name">{ele.mobilenumberString.length>2 ? ele.mobileNumber :'mobilenumber'}</div>
        <div className="ma-pp-item-name">{ele.Location.length>2 ? ele.Location :'Location'}</div>
        <div className="ma-pp-item-name">{ele.Service.Date.length>2 ? ele.Service.Date :'ServiceDate'}</div>
        <div className="ma-pp-item-name">{ele.Address.length>2 ? ele.Address :'Address'}</div>
        {/* <div className="ma-pp-item-name">{ele.Service.type.length>2 ? ele.Service.type :'none'}</div> */}
        {/* <div className="ma-pp-item-name"><button className='ma-pp-btn'>view</button></div> */}
        <div className="ma-pp-item-name"><button className='ma-pp-btn' onClick={()=>{handlePView(ele)}}>forword</button></div>
      </div>)
      })
     }
        </div>
      </div>
     </div>
    </>
  );
}

export default PendingPage;
