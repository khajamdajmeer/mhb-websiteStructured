
    import React, { useState } from 'react';
    import './TechreqView.css'
    import { AcceptTechReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
    import Message from '../../Common/Message/Message';
    
    const TechreqView = (props) => {
        // const id = props.data.id
        const handlecancle = props.handlecancle;
        const id = props.data._id
    
    
      
    
        const [showmsg,setShowmsg] = useState(false);
        const [msgdata,setMsgdata]=useState({message:'',navigate:'',showOk:''})
      
        const handleAccept = async()=>{
          const res = await AcceptTechReq(id);
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
    
          <div className="ma-trv-fullscreen">
           <div className="ma-trv-center">
            <div className="ma-trv-head">Customer Details</div>
            <div className="ma-trv-body">
                <ul className='ma-trv-bodyul'>
                    <li className='ma-trv-lileft'>Name:</li>
                    <li className='ma-trv-liright'>{props.data.name}</li>
                </ul>
                <ul className='ma-trv-bodyul'>
                    <li className='ma-trv-lileft'>MobileNumber:</li>
                    <li className='ma-trv-liright'>{props.data.mobileNumber}</li>
                </ul>
                <ul className='ma-trv-bodyul'>
                    <li className='ma-trv-lileft'>Location:</li>
                    <li className='ma-trv-liright'>{props.data.Location}</li>
                </ul>
                <ul className='ma-trv-bodyul'>
                    <li className='ma-trv-lileft'>Address:</li>
                    <li className='ma-trv-liright'> {props.data.Address}</li>
                </ul>
               
                <ul className='ma-trv-bodyul'>
                    <li className='ma-trv-lileft'>Service Type:</li>
                    <li className='ma-trv-liright'>{props.data.Service.type}</li>
                </ul>
              
                <ul className='ma-trv-bodyul'>
                    <li className='ma-trv-lileft'> Service Date:</li>
                    <li className='ma-trv-liright'>{props.data.Service.Date.slice(0,10)}</li>
                </ul>
                <ul className='ma-trv-bodyul color-red'>
                    <li className='ma-trv-lileft '>Note:</li>
                    <li className='ma-trv-liright'>
                       {props.data.Note}
                    </li>
                </ul>
                <ul className='ma-trv-bodyulbtn'>
                    <li className='ma-trv-lileftbtn'><button onClick={handlecancle}>Close</button></li>
                    <li className='ma-trv-lileftbtn'><button className={`  ${props.data.Accepted ? 'disabled-btn':''}`} onClick={handleAccept} disabled={props.data.Accepted}>Accept</button></li>
                </ul>
            </div>
           </div>
        </div>
        </>
      );
    }
    
    
    
    export default TechreqView;
    