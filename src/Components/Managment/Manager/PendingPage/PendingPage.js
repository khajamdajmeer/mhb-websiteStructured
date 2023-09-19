import React, { useEffect, useState } from 'react';
import './PendingPage.css'
import { getPendingReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import PendingView from '../PendingView/PendingView';
import { bindActionCreators } from 'redux';
import { useDispatch,useSelector } from 'react-redux';
import SkeletonLoader from '../../Common/SkeletonLoader/SkeletonLoader';
import {actionCreator} from '../../../../Redux'

const PendingPage = () => {

//using REdux for skeleton loader
const dispatch = useDispatch();
const {showloading,hideloading}= bindActionCreators(actionCreator,dispatch)
const loadinstate = useSelector(state=>state.load)

  const [data,setData]=useState([])
  const onMount =async()=>{
    showloading();
    const res = await getPendingReq();
    setData(res);
    hideloading();


  }
  useEffect(()=>{
    onMount();
    // eslint-disable-next-line
  },[])

  //  LOGIC FOR RENDERING THE PENDING VIEW
  const [showpview,setShowpview]=useState(false)
  const [pviewdata,setPviewdata]=useState('')
  const handlePView =(ele)=>{
    setShowpview(true);
    setPviewdata(ele);
    console.log(ele)
  }
  const closepview = ()=>{
    setShowpview(false)
    onMount();
  }
  //logic for geting the current data

  const currentDate = new Date(); // Current date in local time
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

  return (
    <>
    {showpview&&(
      <PendingView data={pviewdata} closefunc = {closepview} />
    )}
    
     <div className="ma-pp-fullscreen">
      <div className="ma-pp-centerdiv">
        <div className="ma-pp-head">
          <h1>Pending Data</h1>
          <h2 className='color-red'>{formattedDate.slice(0,10)}</h2>
        </div>
        <div className="ma-pp-body">
          {loadinstate&&<SkeletonLoader/>}
     {
      data.map((ele,index)=>{
        return( <div className={ele.Complain ?"complainbg ma-pp-mapitem":'ma-pp-mapitem'}>
        <div className="ma-pp-item-name">{index+1}.{ele.name}</div>
        <div className="ma-pp-item-name">{ele.mobilenumberString}</div>
        <div className="ma-pp-item-name">{ele.Location}</div>
        <div className={`ma-pp-item-name ${ele.Service.Date.slice(0,10)<=formattedDate ? 'color-red':''}`}>{ele.Service.Date}</div>
        <div className="ma-pp-item-name">{ele.Address}</div>
        {/* <div className="ma-pp-item-name">{ele.Service.type.length>2 ? ele.Service.type :'none'}</div> */}
        {/* <div className="ma-pp-item-name"><button className='ma-pp-btn'>view</button></div> */}
        <div className="ma-pp-item-name ma-pp-btnresponse"><button className='ma-pp-btn' onClick={()=>{handlePView(ele)}}>forword</button></div>
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
