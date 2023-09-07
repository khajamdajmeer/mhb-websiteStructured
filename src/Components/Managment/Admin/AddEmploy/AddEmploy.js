import React, { useState } from 'react';
import './AddEmploy.css'
import { CreateNewEmploy } from '../../../../ApiCalls/AdminCalls/EmplooyCalls';
import Message from '../../Common/Message/Message'

const AddEmploy = () => {
//comment add here

    const currentDate = new Date().toISOString().split('T')[0];


    const [data,setData] =useState({
        name:'',age:'',mobilenumber:'',email:'',joiningdate:'',presentaddress:'',permanentaddress:'',designation:'',username:'',
        adharnumber:''
    }) 
    const onchange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const [showmsg,setShowmsg]=useState(false);
    const [msginfo,setMsginfo]=useState({message:'',navigate:'',showOk:''})

    const handleCreate = async()=>{
        const res = await CreateNewEmploy(data);

        if(res.success){
            // setData({
            //     name:'',age:'',mobilenumber:'',email:'',joiningdate:'',presentaddress:'',permanentaddress:'',designation:'',username:'',
            //     adharnumber:''
            // }) 
            setShowmsg(true);
            setMsginfo({message:res.message,navigate:'/admindashboard/emplooys',showOk:true})
        }
        else{
            setShowmsg(true);
            setMsginfo({message:'error occured Please Check the data and try again',navigate:'/admindashboar/newemplooy',showOk:false})
            setTimeout(() => {
                setShowmsg(false);
            }, 3000);

        }
    }


  return (
    <>
    {showmsg&&msginfo&&(
        <Message message={msginfo.message} navigate={msginfo.navigate} showOk={msginfo.showOk}/>
    )}
          <div className="ad-em-fullscreen">
          <div className="ad-em-center">
          <h2 className="ad-em-heading">
          New Emplooy
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
            <input type="number" name='adharnumber' value={data.adharnumber} onChange={onchange} className='ad-nem-input' placeholder='Emplooy Adhar No'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Present Address </label>
            <textarea type="number" name='presentaddress' value={data.presentaddress} onChange={onchange} className='ad-nem-input' cols={3} placeholder='Emplooy Present Address'/>
            </div>
            <div className="ad-nem-ipbox">
            <label htmlFor="name" className='ad-nem-label'>Permanent Address </label>
            <textarea type="number" name='permanentaddress' value={data.permanentaddress} onChange={onchange} className='ad-nem-input' rows={3} placeholder='Emplooy Permanent Address'/>
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
            <button name="" id="" className='ad-nem-input ad-nem-btn' onClick={handleCreate}
            disabled={
                data.name.length<5 || data.mobilenumber.length!==10 ||data.username.length<6 ||data.designation.length<2||
                data.adharnumber.length!==12
            }
            >  Create Emplooy </button>                
            
            </div>
           

            </div>
            
        </div>
        
</div>
</div>
    </>
  );
}

export default AddEmploy;
