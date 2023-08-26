import React,{useState} from 'react';
import './SignUpPage.css'
import { adminSignup,otpverify } from '../../../../ApiCalls/AdminCalls/SigninCalls';
import Message from '../../Common/Message/Message'
import { Link } from 'react-router-dom';

const SignUpPage = () => {


    const [data,setData]=useState({name:'',email:'',moblienumber:'',password:'',repassword:'',
adminotp:'',userotp:''})

const onchange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}
const [disabletop,setDisabletop]=useState(false);
const [disablebottom,setDisablebottom]=useState(true);


const [showmsg,setShowmsg]=useState(false);
const [msg,setMsg]=useState({message:'',navigate:'',showOk:'false'})

const handlesendOTP = async()=>{
    const res = await adminSignup(data); 
    if(res.success){
        setDisablebottom(false);
        setDisabletop(true);
        setShowmsg(true);
        setMsg({...msg,message:res.message})
    }
    else{
        setShowmsg(true);
        setMsg({...msg,message:res.message})
    }
    setTimeout(() => {
        setShowmsg(false);
    }, 2500);
}

const handleSignup =async()=>{
    const res = await otpverify(data);
    if(res.success){
        setShowmsg(true);
        setMsg({message:res.message,navigate:'/loginadmin',showOk:true})
    }
    else{
        setShowmsg(true);
        setMsg({message:res.message,navigate:'',showOk:false})
    }


    setTimeout(() => {
        setShowmsg(false);
    }, 2500);
}
  return (
    <>
    {showmsg&&(<Message message={msg.message} navigate={msg.navigate} showOk={msg.showOk}/>)}
      <div className="ad-sup-fullscreen">
        <div className="ad-sup-center">
            <h1 className="ad-sup-head">Admin Signup</h1>
            <div className="ad-sup-body">
                <ul className="ad-sup-ipitem">
                    <li><label htmlFor="Name">Name</label></li>
                    <li><input type="text" name="name" value={data.name} onChange={onchange} id="" placeholder='Enter Name' disabled={disabletop}/></li>
                </ul>
                <ul className="ad-sup-ipitem">
                    <li><label htmlFor="Name">Email</label></li>
                    <li><input type="email" name="email" aria-describedby='Invaid Email' value={data.email} onChange={onchange} id="" placeholder='Enter Email' disabled={disabletop}/></li>
                </ul>
                <ul className="ad-sup-ipitem">
                    <li><label htmlFor="Name">Mobilenumber</label></li>
                    <li><input type="number" name="moblienumber" value={data.moblienumber} onChange={onchange} id="" placeholder='Enter Mobile number' disabled={disabletop}/></li>
                </ul>
                <ul className="ad-sup-ipitem">
                    <li><label htmlFor="Name">Password</label></li>
                    <li><input type="password"name="password" value={data.password} onChange={onchange} id="" placeholder='Enter Password' disabled={disabletop} /></li>
                </ul>
                <ul className="ad-sup-ipitem">
                    <li ><label htmlFor="Name" className={`${data.password!==data.repassword ? 'color-red':''}`}>Re-enter Password</label></li>
                    <li><input type="text" name="repassword" value={data.repassword} onChange={onchange} id="" placeholder='Re Enter Password' disabled={disabletop}/></li>
                </ul>
                

                <ul className="ad-sup-ipitem">
                    <li><button className='ad-sup-sendotp' onClick={handlesendOTP}>SendOtp</button></li>
                    {/* <li><input type="text" name="" id="" /></li> */}
                </ul>
                <ul className="ad-sup-ipitem">
                    <li><label htmlFor="Name">Admin OTP</label></li>
                    <li><input type="number" name="adminotp" value={data.adminotp} onChange={onchange} id="" placeholder='Enter admin otp'  disabled={disablebottom}/></li>
                </ul>
                <ul className="ad-sup-ipitem">
                    <li><label htmlFor="Name">User OTP</label></li>
                    <li><input type="number" name="userotp" value={data.userotp} onChange={onchange} id="" placeholder='Enter your OTP' disabled={disablebottom}/></li>
                </ul>
                <ul className="ad-sup-ipitem">

<Link className='ad-alp-signuplink linkad-sup' to='/loginadmin'>Sign in!</Link>
  </ul>
                <ul className="ad-sup-ipitem">
                    <li><button className='ad-sup-signupbtn' onClick={handleSignup} htmlFor="Name" disabled={disablebottom}>SignUp</button></li>
                    {/* <li><input type="text" name="" id="" /></li> */}
                </ul>
                


            </div>

        </div>
      </div>
    </>
  );
}

export default SignUpPage;
