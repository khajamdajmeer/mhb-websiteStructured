import React, { useEffect, useState } from 'react';
import './ClientHistoryView.css';
import { customerhistory } from '../../../../ApiCalls/ManagerCalls/SearchCall';
import ClientView from '../../Admin/ClientView/ClientView';
import {raisecomplainCall} from '../../../../ApiCalls/ManagerCalls/RequestCall';
import TopMsg from '../../Common/TopMsg/TopMsg'
const ClientHistoryview = (props) => {


    const closefunction = props.closefunction;
    const [data,setData]=useState([])
  const [infoview,setInfoview]=useState(false);
  const [viewdata,setViewdata]=useState({});

 const closeinfoview = ()=>{
    setInfoview(false)
 }
  const handleview = (data)=>{
    setInfoview(true)
    setViewdata(data);
  }

  const onMount = async()=>{
    const res = await customerhistory(props.data._id);
    if(res.success){
        setData(res.message)
    }
  }
  useEffect(()=>{
    onMount();
    // eslint-disable-next-line
  },[])

  const [showmsg,setShowmsg]=useState(false);
  const [msg,setMsg]=useState('')
  const closemsg = ()=>{
    setShowmsg(false);
  }

  const raisecomplainhandle = async(id,note)=>{
    const res = await raisecomplainCall(id,note);
      setShowmsg(true);
      setMsg(res.message);
    setInfoview(false)

      
    
  }
    
    
  return (
    <>
    {showmsg&&<TopMsg message={msg} handleclose={closemsg} />}
    {infoview&&(<ClientView closefunction={closeinfoview} data={viewdata} complainfunction={raisecomplainhandle}/>)}
    <div className="ma-chv-fullscreen" >
       <div className="ma-chv-center">
        <h2 className="ma-chv-head">Customer Details</h2>
            <ul className='ma-chv-bodyul'>
                <li className='ma-chv-lileft'>{props.data.name}</li>
                <li className='ma-chv-liright'>{props.data.mobileNumber}</li>
            </ul>
        <div className="ma-chv-body">
          {data.map((ele,index)=>{
            return(
              <div className="ma-chv-mapitem">{index+1}
            <div className="ma-chv-item">{ele.Location}</div>
            <div className="ma-chv-item"> {ele.Address}</div>
            <div className="ma-chv-item color-red"> {ele.Service.Delivery.slice(0,10)}</div>
            <div className="ma-chv-item"> {ele.Service.type}</div>
            <div className="ma-chv-viewbtn"> <button onClick={()=>handleview(ele)}>View</button></div>
          </div>
            )
          })}
        
          
            
           
        </div>
            <button className='ma-chv-closebtn' onClick={closefunction}>Close</button>
       </div>
    </div>
      
    </>
  );
}





export default ClientHistoryview;
