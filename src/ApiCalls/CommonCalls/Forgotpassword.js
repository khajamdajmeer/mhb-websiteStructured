import {host} from '../Host'
export const SendOtp = async(username)=>{
    const response = await fetch(`${host}/api/emplooy/forgotpassword`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:username
        })

    })
    const res = await response.json();
    return res;
}

export const ResetPassword=async(data)=>{
    console.log(data)

    const response = await fetch(`${host}/api/emplooy/verifyotp`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',

        },
        body:JSON.stringify({
            username:data.username,
            password:data.password,
            repassword:data.repassword,
            OTP:Number(data.otp)
            
        })
    })
    const res = await response.json();
    return res;
}