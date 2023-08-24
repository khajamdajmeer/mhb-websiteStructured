import React,{useEffect, useState} from 'react';
import { GetTechDetails,RevertReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import Message from '../../Common/Message/Message';
const RevertMsg = (props) => {

    const [techdata, setTechdata] = useState([{
        name: '', _id: '', count: ''
    }])

    const onMount =async()=>{
        const techres = await GetTechDetails();
        setTechdata(techres)
    }

    const [senddata,setSenddata]=useState({rid:props.newdata._id,tid:''})
    const onchange =(e)=>{
        setSenddata({...senddata,[e.target.name]:e.target.value})
    }

    const [showmsg,setShowmsg]=useState(false);
    const [msgData,setMsgData]=useState({message:'',navigate:'',showOk:''})
    const handleRevert = async()=>{
            const res = await RevertReq(senddata);
                setShowmsg(true);
                setMsgData({message:res.message,navigate:'',showOk:false})
            setTimeout(() => {
                setShowmsg(false)
                props.handlecancle();
            }, 3000);
    }



    useEffect(()=>{
        onMount();
    },[])


  return (
    <>
    {showmsg&&(<Message message={msgData.message} navigate={msgData.navigate} showOk={msgData.showOk}/>)}
     <div className="tech-finish-full">

<h1>hi</h1>
<div className="tech-finish-center">
<div className="tech-my-name">
       </div>
       <div className="tech-finish-data">
        <ul>
            <li className='tech-finish-left'>Name :</li>
            <li className='tech-finish-right'>{props.newdata.name}</li>
        </ul>
        <ul>
            <li className='tech-finish-left'>Mobilenumber :</li>
            <li className='tech-finish-right'>{props.newdata.mobileNumber}</li>
        </ul><ul>
            <li className='tech-finish-left'>Location :</li>
            <li className='tech-finish-right'>{props.newdata.Location}</li>
        </ul><ul>
            <li className='tech-finish-left'>Address :</li>
            <li className='tech-finish-right'>{props.newdata.Address}</li>
        </ul>
        <ul>
            <li className='tech-finish-left'>ServiceType :</li>
            <li className='tech-finish-right'>{props.newdata.Service.type}</li>
        </ul>
        <ul>
            <li className='tech-finish-left'>ServiceDate:</li>
            <li className='tech-finish-right'>{props.newdata.Service.Date}</li>
        </ul>
        <ul>
            <li className='tech-finish-left'>Note:</li>
            <li className='tech-finish-right'>{props.newdata.Note}</li>
        </ul>

        <ul className='tech-finish-displayblock'>
        <li className='tech-finish-left'> <label htmlFor="Discription" className='tech-finishlabel'>Reason</label></li>
            <li className='tech-finish-right'><select name="tid" value={senddata.tid} onChange={onchange} id="">
                <option value="0">---select---</option>
                {techdata.map((ele, index) => {
                        return (<option value={ele._id} disabled={ele._id===props.tid} >{ele.name}   ({ele.count})</option>)})}
                </select></li>
        </ul>
      
       
        
        <div className="tech-finish-btns">
            <button className='btncancle' onClick={props.handlecancle}>cancle</button>
            <button className='btncomplete' onClick={handleRevert}>Change </button>

        </div>
       </div>
</div>

</div>
      
    </>
  );
}

export default RevertMsg;
