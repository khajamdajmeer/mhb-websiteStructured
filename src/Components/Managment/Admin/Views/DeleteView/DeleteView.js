import React, { useEffect, useState } from 'react';
import './DeleteView.css';
import {getManagerdata,deleteToTask} from '../../../../../ApiCalls/AdminCalls/ProgressCalls'
import TopMsg from '../../../Common/TopMsg/TopMsg';

const DeleteView = (props) => {

    const closefunction = props.closefunction;
    const[managerData,setManagerData]=useState([])


    const onMount = async()=>{
        const data = await getManagerdata();
        if(data.success){
            setManagerData(data.message)
        }
    }


    useEffect(()=>{
        onMount();
    },[])


    const [selectname,setSelectname]=useState('')
    const [mid,mname]=selectname.split(':')
    const namechange = (e)=>{
        setSelectname(e.target.value);
    }
    const [note,setNote]=useState('')
    const handlenotechange = (e)=>{
        setNote(e.target.value)
    }


    const [showmsg,setShowmsg]=useState(false);
    const [msg,setMsg]=useState('')

    const handlecreatetask=async()=>{
        const res = await deleteToTask(props.data._id,mid,mname,note);
        if(res.success){
            setShowmsg(true);
            setMsg(res.message)
        }
        setTimeout(() => {
            setShowmsg(false);
            closefunction()
        }, 3500);
    }
    const closemsg = ()=>{
        setShowmsg(false);
        closefunction()
    }
  return (
    <>
    {showmsg&&<TopMsg message={msg} handleclose={closemsg} />}
    <div className="ad-ddbv-fullscreen" >
       <div className="ad-ddbv-center">
        <h2 className="ad-ddbv-head"> Details</h2>
        <div className="ad-ddbv-body">
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Name:</li>
                <li className='ad-ddbv-liright'>{props.data.name}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>MobileNumber:</li>
                <li className='ad-ddbv-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Location:</li>
                <li className='ad-ddbv-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Address:</li>
                <li className='ad-ddbv-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Manager Name:</li>
                <li className='ad-ddbv-liright'>{props.data.forworded.name}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Service Type</li>
                <li className='ad-ddbv-liright'>{props.data.ServiceType}</li>
            </ul>
           
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Request Date:</li>
                <li className='ad-ddbv-liright'>{props.data.Requestdate.slice(0,15)}</li>
            </ul>
            
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Reason:</li>
                <li className='ad-ddbv-liright'>{props.data.Deleted.reason}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Deleted Date:</li>
                <li className='ad-ddbv-liright'>{props.data.Deleted.Date.slice(0,15)}</li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Select Manager</li>
                <li className='ad-ddbv-liright'>
                    <select className='ad-ddbv-managerselect' name="selectname" id="" value={selectname} onChange={namechange}>
                        <option value="0">--select---</option>
                        {managerData.map((ele,index)=>{
                            return(<option value={`${ele._id}:${ele.name}`}>{ele.name}</option>)
                        })}
                    </select>
                </li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-lileft'>Task:</li>
                <li className='ad-ddbv-liright'>
                    <textarea className='ad-ddbv-textarea' name="note" value={note} onChange={handlenotechange} id="" placeholder='Enter the Task Details'></textarea>
                    </li>
            </ul>
            <ul className='ad-ddbv-bodyul'>
                <li className='ad-ddbv-bodyul'>
                <button className='ad-ddbv-closebtn' onClick={closefunction}>Close</button>
                </li>
                <li className='ad-ddbv-liright'>
            <button className='ad-ddbv-closebtn' onClick={handlecreatetask}>Create Task</button>
                </li>
            </ul>
           
        </div>
       </div>
    </div>
      
    </>
  );
}




export default DeleteView;
