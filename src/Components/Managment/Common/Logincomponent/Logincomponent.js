import React, { useEffect, useState } from 'react';
// import Servicemanager from '../Navbar/Servicemanager';
import './Logincomponent.css';
import { Logincall } from '../../../../ApiCalls/ManagerCalls/Logincall';
import Message from '../Message/Message';
import { useNavigate,Link } from 'react-router-dom';
const Logincomponent = (props) => {

  const history = useNavigate();

const [logindata,setLogindata] = useState({username:"",password:""});

const onchange = (e)=>{
  setLogindata({...logindata,[e.target.name]:e.target.value});
}
const [message,setMessage]=useState({message:"",navigate:"",showOk:''})
const [showmessage,setShowmessage]=useState(false);
useEffect(()=>{
  const istoken = localStorage.getItem('auth-token')
  const authlevel = localStorage.getItem('level')
  // localStorage.clear()
  if(istoken&&authlevel!=="L3"){
    history('/dashboard')
  }
  else if(istoken&&authlevel==='L3'){
    history('/technician')
  }
  
},[history])

const handlelogin = async(e)=>{
  e.preventDefault();
  const res =await Logincall(logindata.username,logindata.password);
  if(res.message==="login success"){
    setShowmessage(true)
    setMessage({message:res.message,navigate:'/dashboard',showOk:true})
    localStorage.setItem("auth-token",res.Token)
    if(res.level==='Technician'){
      console.log(res)
      setMessage({message:res.message,navigate:"/technician",showOk:true})
      let lv = "L3"
      localStorage.setItem('level',lv)
    }
    else{
      console.log(res)
      setMessage({message:res.message,navigate:'/dashboard',showOk:true})

      let lv = 'L2'
      localStorage.setItem('level',lv)
    }
  }
  else{
    setShowmessage(true)
    setMessage({message:res.message,navigate:'/dashboard',showOk:true})
  }
  setTimeout(()=>{
    setShowmessage(false)
    history('/dashboard')
  },3000)


}

  return (
    <>
    {/* <Servicemanager/> */}
    {showmessage&&(
    <Message message={message.message} navigate={message.navigate} showOk={message.showOk}/>
    )

    }

 

  <div className="user-container">
    <h1>Welcome to MHB </h1>
<div className="signin-div signin-right">
  <div className="loginhead">Login</div>

  <form >

    <ul className="signin-list">
      <li className="list-input"><div className="input-container">username</div>
        <input type="username" value={logindata.username} onChange={onchange} className='signin-input' name='username' placeholder='Enter your Email' required /></li>
      <li className="list-input"><div className="input-container">Password</div>
        <input type="password" value={logindata.password} onChange={onchange} className='signin-input' name='password' x placeholder='Enter your Password' required /></li>

      <li className="list-input paddingnone forgotpass"><Link to='/forgotpassword' className="input-container forgpass">
        forgot password?
      </Link></li>

      <li className="list-input paddingnone" >

        <button type="submit" onClick={handlelogin} id='signin-btn'>sign In</button>

      </li>
    </ul>

  </form>

</div>



</div>
    </>
  );
}

export default Logincomponent;
