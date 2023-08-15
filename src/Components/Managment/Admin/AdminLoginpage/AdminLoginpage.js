
    import React, { useCallback, useEffect, useState } from 'react';
    // import Servicemanager from '../Navbar/Servicemanager';
    import './AdminLoginpage.css';
    import { adminlogin,adminAuthorization } from '../../../../ApiCalls/AdminCalls/SigninCalls';
    import Message from '../../Common/Message/Message';
    import { useNavigate } from 'react-router-dom';
    const AdminLoginpage = (props) => {
    
      const history = useNavigate();
    
    const [logindata,setLogindata] = useState({username:"",password:""});
    
    const onchange = (e)=>{
      setLogindata({...logindata,[e.target.name]:e.target.value});
    }
    const [message,setMessage]=useState({message:"",navigate:""})
    const [showmessage,setShowmessage]=useState(false);

    //checking authorization of the token
    const istoken = localStorage.getItem('auth-token')
    const authorization= useCallback(async()=>{
        const authlevel = localStorage.getItem('level')
        if(authlevel==='l1'&&istoken){
          const val =  await adminAuthorization();
          if(val.validation){

           setShowmessage(true)
      setMessage({message:val.message,navigate:'/admindashboard'})
          }
          else{
            setShowmessage(true)
            setMessage({message:val.message,navigate:'/admindashboard'})
          }
        }
        else{
            
          localStorage.clear();
          history('/loginadmin')
      }
    },[history,istoken])



    useEffect(()=>{
      

    authorization();
    },[authorization])
    
    const handlelogin = async(e)=>{
      e.preventDefault();
      const res =await adminlogin(logindata);
      console.log(res)
      setShowmessage(true)
      setMessage({message:res.message,navigate:'/admindashboard'})
    //   if(res.message==="loginsuccess"){
    //     setShowmessage(true)
    //     console.log(res);
    //     localStorage.setItem("auth-token",res.Token)
    //     if(res.level==='technician'){
    //       console.log(res)
    
    //       setMessage({message:res.message,navigate:"/technician"})
    //       let lv = "L3"
    //       localStorage.setItem('level',lv)
    //     }
    //     else{
    //       console.log(res)
    //       setMessage({message:res.message,navigate:"/service"})
    //       let lv = 'L2'
    //       localStorage.setItem('level',lv)
    //     }
    //   }
    //   else{
    //     setShowmessage(true)
    //     setMessage({message:res.message})
    
    //     setTimeout(()=>{
    //       setShowmessage(false)
    //     },3000)
    //   }
    
    
    }
    
      return (
        <>
        {/* <Servicemanager/> */}
        {showmessage&&message&&(
        <Message message={message.message} navigate={message.navigate}/>
        )
    
        }
    
     
    
      <div className="user-container">
        <h1>Welcome to MHB </h1>
    <div className="signin-div signin-right">
      <div className="loginhead">Admin Login</div>
    
      <form >
    
        <ul className="signin-list">
          <li className="list-input"><div className="input-container">Email</div>
            <input type="username" value={logindata.username} onChange={onchange} className='signin-input' name='username' placeholder='Enter your Email' required /></li>
          <li className="list-input"><div className="input-container">Password</div>
            <input type="password" value={logindata.password} onChange={onchange} className='signin-input' name='password' x placeholder='Enter your Password' required /></li>
    
          <li className="list-input paddingnone forgotpass">
            <div className="input-container">signup</div>
            <div className="input-container forgpass">
            forgot password?
          </div></li>
    
          <li className="list-input paddingnone" >
    
            <button type="submit"  id='signin-btn' disabled={logindata.username.length<6} onClick={handlelogin}>sign In</button>
    
          </li>
        </ul>
    
      </form>
    
    </div>
    
    
    
    </div>
        </>
      );
    }
    
    export default AdminLoginpage;
    
