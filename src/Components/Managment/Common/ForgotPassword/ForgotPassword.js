import React, { useState } from 'react';
import './ForgotPassword.css'
import closeeye from '../../../images and tones/closeeye.png'
import { SendOtp,ResetPassword } from '../../../../ApiCalls/CommonCalls/Forgotpassword';
import Message from '../Message/Message';

const ForgotPassword = () => {

  const [data,setData]= useState({
    username:'',password:'',repassword:'',otp:''
  })
  const onchange=(e)=>{
setData({...data,[e.target.name]:e.target.value})
  }
  const [viewpass,setViewpass]=useState(false)
  const handleViewpass =()=>{
    setViewpass(!viewpass)
  }

  const [submitstatus,setSubmiistatus]=useState(false);
const [showmsg,setShowmsg]=useState(false)
const [msgdata,setMsgdata]=useState({message:'',showOk:'',navigate:''})
const [disableusername,setDisableusername]=useState(false)
const [disablestate,setDisablestate]=useState(true)
  const handleSendotp=async()=>{
    const res = await SendOtp(data.username)
    if(res){
      if(res.success){
        setDisableusername(true)
        setDisablestate(false)
      }
      setShowmsg(true)
      setMsgdata({...msgdata,showOk:false,message:res.message})
    }
    
      
    setTimeout(()=>{
      setShowmsg(false)
    },3000)
  }
  const handlesubmit=async()=>{
    // console.log(data)
    const response = await ResetPassword(data);
    if(response){
      setMsgdata({message:response.message,showOk:true,navigate:'/service'})
      setShowmsg(true)
    }
    setTimeout(() => {
      setShowmsg(false)
    }, 3000);

  }

  return (
    <>
    {showmsg&&<Message message={msgdata.message} showOk={msgdata.showOk} navigate={msgdata.navigate}/>}
      <div className="cm-fp-fscreen"> 
      <div className="cm-fp-center">
        <h1>Reset Password</h1>
        <div className="cm-fp-input">
          <ul>
            <li className='cm-fp-li'>
          <label htmlFor="" className='cm-fp-lable ' >Username</label>
          <div className="cm-fp-otpbtnbox">
          <input type="text" name='username' disabled={disableusername} value={data.username} placeholder='enter username' onChange={onchange} className='cm-fp-username' />
          <button className='cm-fp-otpbtn' onClick={handleSendotp} disabled={!disablestate} >Send OTP</button>
          </div>

            </li>
            <li className='cm-fp-li'>
          <label htmlFor="" className='cm-fp-lable'>password</label>
          <div className="cm-fp-otpbtnbox">
          <input type={viewpass ? 'text':'password'} name='password' value={data.password} placeholder='enter password' onChange={onchange} disabled={disablestate} />
          <button className='cm-fp-otpbtn' onClick={handleViewpass} disabled={disablestate}><img src={closeeye} alt="" /></button>

          </div>
            </li>
            <li className='cm-fp-li'>
          <label htmlFor="" className={`cm-fp-lable ${data.password===data.repassword ? ' ':'cm-color-red'}`}>Re-Enter Password</label>
          <input type={viewpass ? 'text':'password'} name='repassword' disabled={disablestate} value={data.repassword} placeholder='re-enter password' onChange={onchange} />
            </li><li className='cm-fp-li'>
          <label htmlFor="" className='cm-fp-lable'>Enter OTP</label>
          <input type="number" name='otp' value={data.otp} placeholder='enter OTP' onChange={onchange}  disabled={disablestate}/>
            </li>
            <li>
              <button className='cm-fp-resetbtn' onClick={handlesubmit} disabled={disablestate}>Reset</button>
            </li>

          </ul>
        </div>
      </div>
      </div>
    </>
  );
}

export default ForgotPassword;
