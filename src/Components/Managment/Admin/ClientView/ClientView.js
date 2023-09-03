import React,{useState} from 'react';
import './ClientView.css'

const ClientView = (props) => {

    const closefunction = props.closefunction;
    const [reason,setReason]=useState('')
    const raisecomplain = props.complainfunction ? props.complainfunction:console.log();
    const onchange = (e)=>{
        setReason(e.target.value)
    }

    
  return (
    <>
    <div className="ad-cv-fullscreen" >
       <div className="ad-cv-center">
        <div className="ad-cv-head">Customer Details</div>
        <div className="ad-cv-body">
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Name:</li>
                <li className='ad-cv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>MobileNumber:</li>
                <li className='ad-cv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Location:</li>
                <li className='ad-cv-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Address:</li>
                <li className='ad-cv-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>ManagerName:</li>
                <li className='ad-cv-liright'>{props.data.forworded.name}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Tech Name</li>
                <li className='ad-cv-liright'>{props.data.Technicain.name}</li>
            </ul>
           
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Service Type:</li>
                <li className='ad-cv-liright'>{props.data.Service.type}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Request Date:</li>
                <li className='ad-cv-liright'>{props.data.Service.Date}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Deliverd Date:</li>
                <li className='ad-cv-liright'>{props.data.Service.Delivery.slice(0,10)}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Discription</li>
                <li className='ad-cv-liright'>{props.data.Discription}</li>
            </ul>
            <ul className='ad-cv-bodyul'>
                <li className='ad-cv-lileft'>Complain Reason</li>
                <li className='ad-cv-liright'><textarea onChange={onchange} name='reason' value={reason} placeholder='Complain Reason' type="text" /></li>
            </ul>
            <ul className='ad-cv-bodyulbtn'>
                <li className='ad-cv-lileftbtn'><button onClick={closefunction}>Close</button></li>
                <li className='ad-cv-lileftbtn'><button className={reason.length<5 ? 'btndisbale':''} onClick={()=>raisecomplain(props.data._id,reason)} disabled={reason.length<5}>Raise Complain</button></li>
            </ul>
        </div>
       </div>
    </div>
      
    </>
  );
}

export default ClientView;
