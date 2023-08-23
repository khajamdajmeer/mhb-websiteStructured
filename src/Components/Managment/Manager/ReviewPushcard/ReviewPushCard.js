import React, { useState } from 'react';
import './ReviewPushCard.css'
import { PushToFinished } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import Message from '../../Common/Message/Message';

const ReviewPushCard = (props) => {
    // const id = props.data.id
    const handlecancle = props.handlecancle;
    const id = props.data._id
    const dis =props.data.Discription

    const [data,setData]=useState({id:id,Discription:dis})

    const onchange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const [showmsg,setShowmsg] = useState(false);
    const [msgdata,setMsgdata]=useState({message:'',navigate:'',showOk:''})
  
    const handleDelevierd = async()=>{
      const res = await PushToFinished(data);
      setShowmsg(true)
      setMsgdata({message:res.message,showOk:false,navigate:'/dashboad/reviewreq'})
      setTimeout(()=>{
        setShowmsg(false)
handlecancle();

      },3000)
      
  
    }
  return (
    <>
        {showmsg&&<Message message={msgdata.message} navigate={msgdata.navigate} showOk={msgdata.showOk}/>}

      <div className="ma-rpc-fullscreen">
       <div className="ma-rpc-center">
        <div className="ma-rpc-head">Customer Details</div>
        <div className="ma-rpc-body">
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>Name:</li>
                <li className='ma-rpc-liright'>{props.data.name}</li>
            </ul>
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>MobileNumber:</li>
                <li className='ma-rpc-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>Location:</li>
                <li className='ma-rpc-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>Address:</li>
                <li className='ma-rpc-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>Technician:</li>
                <li className='ma-rpc-liright'>{props.data.Technicain.name}</li>
            </ul>
           
           
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>Service Type:</li>
                <li className='ma-rpc-liright'>{props.data.Service.type}</li>
            </ul>
          
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'> Date:</li>
                <li className='ma-rpc-liright'>{props.data.Requestdate.slice(0,10)}</li>
            </ul>
            <ul className='ma-rpc-bodyul'>
                <li className='ma-rpc-lileft'>Discription</li>
                <li className='ma-rpc-liright'>
                    <textarea type="text" name='Discription' value={data.Discription} onChange={onchange} className='ma-rpx-textarea' placeholder='Enter the discription' />
                </li>
            </ul>
            <ul className='ma-rpc-bodyulbtn'>
                <li className='ma-rpc-lileftbtn'><button onClick={handlecancle}>Close</button></li>
                <li className='ma-rpc-lileftbtn'><button onClick={handleDelevierd}>Finish</button></li>
            </ul>
        </div>
       </div>
    </div>
    </>
  );
}



export default ReviewPushCard;
