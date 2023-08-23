import React, { useEffect, useState } from 'react';
import './PendingView.css'
import { GetTechDetails,ForwordPendingReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import Message from '../../Common/Message/Message';

const PendingView = (props) => {

    const [data,setData]=useState({tid:'',Note:props.data.Note})
    const onchange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const [techname,setTechname]=useState([])
    const onMount=async()=>{
        const res = await GetTechDetails();
        setTechname(res)
    }
    useEffect(()=>{
        onMount();
    },[])
const [showmsg,setShowmsg]=useState(false)
const [msgData,setMsgData]=useState({message:''})
    //LOGIC FOR HANDLING THE FORWORD
    const handleforword =async(id)=>{
        const res = await ForwordPendingReq(id,data);
        console.log(await res);
        setShowmsg(true);
        setMsgData({message:res.message})
        setTimeout(()=>{
            setShowmsg(false)
            props.closefunc();
        },2000)


    }

    

  return (
    <>
    {showmsg&&(
        <Message message={msgData.message}/>
    )}
      <div className="ma-pv-fullscreen">
       <div className="ma-pv-center">
        <div className="ma-pv-head">Customer Details</div>
        <div className="ma-pv-body">
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>Name:</li>
                <li className='ma-pv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>MobileNumber:</li>
                <li className='ma-pv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>Location:</li>
                <li className='ma-pv-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>Address:</li>
                <li className='ma-pv-liright'> {props.data.Address}</li>
            </ul>
           
           
           
            
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>Request Date:</li>
                <li className='ma-pv-liright'>{props.data.Requestdate.slice(0,16)}</li>
            </ul>
            
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>Technicain</li>
                <li className='ma-pv-liright'>
                    <select id="" value={data.tid} name='tid' onChange={onchange}>
                        <option value="0">---select---</option>
                        {techname.map((ele,index)=>{
                            return (
                        <option value={ele._id}>{ele.name} ({ele.count})</option>
                            )
                        })}

                    </select>
                </li>
            </ul>
            <ul className='ma-pv-bodyul'>
                <li className='ma-pv-lileft'>Note</li>
                <li className='ma-pv-liright'><textarea name="Note" value={data.Note} id="" rows={3} placeholder='Enter Note (Optional)' onChange={onchange}/></li>
            </ul>
            <ul className='ma-pv-bodyulbtn'>
                <li className='ma-pv-lileftbtn'><button onClick={props.closefunc} >Close</button></li>
                <li className='ma-pv-lileftbtn'><button onClick={()=>{handleforword(props.data._id)}} disabled={data.tid.length<2} className={data.tid.length<2? 'ma-pv-disable':''}>forword</button></li>
            </ul>
        </div>
       </div>
    </div>
    </>
  );
}

export default PendingView;
