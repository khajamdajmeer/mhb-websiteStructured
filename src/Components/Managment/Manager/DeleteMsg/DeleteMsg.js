import React,{useState} from 'react';
import { DeleteReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import Message from '../../Common/Message/Message';

const DeleteMsg = (props) => {
    
    const [data,setData]=useState({reason:'',id:props.newdata._id});

    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const [showmsg,setShowmsg]=useState(false)
    const [msgdata,setMsgdata]=useState({message:'',showOk:'',navigate:''})
    const handleDelete=async()=>{
        console.log(data)
        const res = await DeleteReq(data);
        if(res.success){
            setMsgdata({message:res.message,showOk:false,navigate:''})
            setShowmsg(true)

        }
        setTimeout(()=>{
            setShowmsg(false)
            props.handlecancle();
        },4000)

    }

  return (
    <>
    {showmsg&&(<Message message={msgdata.message} navigate={msgdata.navigate} showOk={msgdata.showOk}/>)}
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

        <ul className='tech-finish-displayblock'>
        <li className='tech-finish-left'> <label htmlFor="Discription" className='tech-finishlabel'>Reason</label></li>
            <li className='tech-finish-right'><textarea type="textarea" className='tech-finishtextarea' name='reason'  onChange={onchange} value={data.reason} placeholder='Enter the Reason' rows={4}/></li>
        </ul>
      
       
        
        <div className="tech-finish-btns">
            <button className='btncancle' onClick={props.handlecancle}>cancle</button>
            <button className='btncomplete' onClick={handleDelete}  disabled={data.reason.length<6}>Delete</button>

        </div>
       </div>
</div>

</div>
    </>
  );
}

export default DeleteMsg;
