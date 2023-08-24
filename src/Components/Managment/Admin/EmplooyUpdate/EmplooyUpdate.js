import React,{useEffect, useState} from 'react';
import './EmplooyUpdate.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateEmplooy,viewSingleEmplooy } from '../../../../ApiCalls/AdminCalls/EmplooyCalls';
import Message from '../../Common/Message/Message'
const EmplooyUpdate = () => {
    const [data,setData] =useState({_id:'',
        name:'',age:'',mobilenumber:'',email:'',joiningdate:'',presentAdress:'',permanentAdress:'',designation:'',username:'',
        AdharNumber:''
    }) 
    const currentDate = new Date().toISOString().split('T')[0];

    const onchange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const onMount =async()=>{
        const res = await viewSingleEmplooy(id);
        console.log(res)
        setData(res)

    }
    useEffect(()=>{
        onMount();
        // eslint-disable-next-line
    },[])

    const location = useLocation();
    const id = location.state.id;

    const [showmsg,setShowmsg] =useState(false)
    const [msginfo,setMsginfo]=useState({message:'',navigate:''})

    const handleUpdate=async()=>{
        const res = await UpdateEmplooy(data)
        if(res.success){
            setShowmsg(true);
            setMsginfo({message:res.message,navigate:'/admindashboard/emplooys'})
        }
        else{
            setShowmsg(true);
            setMsginfo({message:res.message,navigate:'/admindashboard/updateemplooy'})
        }
        // setTimeout(()=>{
        //     setShowmsg(false);
        // },2000)
    }
    const history = useNavigate()

    const handleCancle = ()=>{
        history('/admindashboard/emplooys')
    }
  return (
    <>
    {showmsg&&(
        <Message message={msginfo.message} navigate={msginfo.navigate} showOk={true}/>
    )

    }
      <div className="ad-em-fullscreen">
          <div className="ad-em-center">
          <h2 className="ad-em-heading">
          Update Emplooy Details
        </h2>
        <div className="ad-nem-data">
            <div className="ad-nem-dip">
                <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Name </label>
            <input type="text" name='name' value={data.name} className='ad-nem-input' onChange={onchange} placeholder=' Emplooy Name'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>age </label>
            <input type="number" name='age' value={data.age} className='ad-nem-input' onChange={onchange} placeholder=' Emplooy Age' />
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>mobilenumber </label>
            <input type="number" name='mobilenumber' value={data.mobilenumber} className='ad-nem-input' onChange={onchange} placeholder=' Emplooy MobileNumber' />
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>email </label>
            <input type="email" name='email' value={data.email} className='ad-nem-input ' onChange={onchange} placeholder=' Emplooy Email'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Username</label>
            <input type="text" name='username' value={data.username} className='ad-nem-input' onChange={onchange} placeholder='Give a username' />
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>joiningdate </label>
            <input type="date" name='joiningdate' value={data.joiningdate} onChange={onchange} className='ad-nem-input'  max={currentDate}  />
            </div>

            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Adhar No </label>
            <input type="number" name='AdharNumber' value={data.AdharNumber} onChange={onchange} className='ad-nem-input' placeholder='Emplooy Adhar No'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Present Address </label>
            <textarea type="number" name='presentAdress' value={data.presentAdress} onChange={onchange} className='ad-nem-input' cols={3} placeholder='Emplooy Present Address'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Permanent Address </label>
            <textarea type="number" name='permanentAdress' value={data.permanentAdress} onChange={onchange} className='ad-nem-input' rows={3} placeholder='Emplooy Permanent Address'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Designation </label>
            <select name="designation" value={data.designation} id=""  className='ad-nem-input' onChange={onchange}>
                <option value="0">--select--</option>
                <option value="Manager">Manager</option>
                <option value="Technician">Technician</option>
            </select>
            </div>
            <div className="ad-nem-ipbox">
            <button name="" id="" className='ad-nem-input ad-nem-btncancle' onClick={handleCancle}
          
            >  Cancle </button>   
            <button name="" id="" className='ad-nem-input ad-nem-btn' onClick={handleUpdate}
          
          >  Update Emplooy </button>              
            
            </div>
           

            </div>
            
        </div>
        
</div>
</div>

      
    </>
  );
}

export default EmplooyUpdate;
