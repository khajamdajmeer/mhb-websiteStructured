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

    //logic for the mapping of history
    const mdata = props.data
    const arrLen = props.data.CallDate.length;
    const historyarr = [];
    for(let i =0;i<arrLen;i++){
        const combineobject = {
            CallDate:mdata.CallDate[i]||'',
            Manager: mdata.Manager[i]|| {id:'',name:''},
            Note:mdata.Note[i]||''
        };
        historyarr.push(combineobject);
    }
    
  return (
    <>

{showmsg&&<TopMsg message={msg} handleclose={closemsg} />}

    <div className="ad-iqvw-fullscreen" >
       <div className="ad-iqvw-center">
        <h2 className="ad-iqvw-head"> Details</h2>
        <h4 className="ad-iqvw-head head2">
            <div>{props.data.name} </div>
            <div>{props.data.mobileNumber}</div>
            </h4>
        <div className="ad-iqvw-body">
            {historyarr.map((ele,index)=>{
                return(
<div className="ad-iqvw-history">
                <div className="ad-iqvw-date">{ele.CallDate.slice(0,10)}</div>
                <div className="ad-iqvw-date">{ele.Note}</div>
                <div className="ad-iqvw-date">{ele.Manager.name}</div>
            </div>
                )
            })}
            
          
          
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
