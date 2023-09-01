import React,{useState,useEffect} from 'react';
import './Inqueryview.css';
import {getManagerdata,InqueryToTask} from '../../../../../ApiCalls/AdminCalls/ProgressCalls'
import TopMsg from '../../../Common/TopMsg/TopMsg';


const Inqueryview = (props) => {

    const closeview = props.closeview;



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
        const res = await InqueryToTask(props.data._id,mid,mname,note);
        console.log(res);
        if(res.success){
            setShowmsg(true);
            setMsg(res.message)
        }
        setTimeout(() => {
            setShowmsg(false);
            closeview()
        }, 3500);
    }
    const closemsg = ()=>{
        setShowmsg(false);
        closeview()
    }
    
  return (
    <>

{showmsg&&<TopMsg message={msg} handleclose={closemsg} />}

    <div className="ad-iqvw-fullscreen" >
       <div className="ad-iqvw-center">
        <h2 className="ad-iqvw-head">Request Details</h2>
        <div className="ad-iqvw-body">
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Name:</li>
                <li className='ad-iqvw-liright'>{props.data.name}</li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>MobileNumber:</li>
                <li className='ad-iqvw-liright'>{props.data.mobileNumber}</li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Location:</li>
                <li className='ad-iqvw-liright'>{props.data.Location}</li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Address:</li>
                <li className='ad-iqvw-liright'> {props.data.Address}</li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Inquery Date:</li>
                <li className='ad-iqvw-liright'>{props.data.CallDate.slice(0,10)}</li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Note</li>
                <li className='ad-iqvw-liright'> {props.data.Note}</li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Task Assign</li>
                <li className='ad-iqvw-liright'>
                    <select name="selectname" id="" value={selectname} onChange={namechange}>
                        <option value="0">---select---</option>
                        {managerData.map((ele,index)=>{
                            return(<option value={`${ele._id}:${ele.name}`}>{ele.name}</option>)
                        })}
                    </select>
                    </li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>Task Details</li>
                <li className='ad-iqvw-liright'><textarea name="note" value={note} onChange={handlenotechange} className='ad-iqvw-textarea' placeholder='Enter Task Details'></textarea></li>
            </ul>
            <ul className='ad-iqvw-bodyul'>
                <li className='ad-iqvw-lileft'>
            <button className='ad-iqvw-closebtn' onClick={closeview} >Close</button>
                </li>
                <li className='ad-iqvw-liright'> 
            <button className={`${selectname.length<10 ? 'ad-iqvw-closebtn btndisbale':'ad-iqvw-closebtn'}`} onClick={handlecreatetask} disabled={selectname.length<10} >Create Task</button>
                </li>
            </ul>

        </div>
       </div>
    </div>
      
    </>
  );
}




export default Inqueryview;
