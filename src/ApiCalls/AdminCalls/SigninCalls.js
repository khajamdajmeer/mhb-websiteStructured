
import Cookies from "js-cookie";
import { host } from "../Host"

export const adminlogin = async(data)=>{

    const response = await fetch(`${host}/api/admin/signin`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:data.username,
            password:data.password
        })
    });
    const res = await response.json();
    console.log(res);

    if(res.success){
        Cookies.set('auth-token',res.Token)
        Cookies.set('level','l1')
    
        return res;
    }
    else{
        return res;
    }


}

export const adminAuthorization = async()=>{
    const response = await fetch(`${host}/api/adminauthorization/authorize`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':Cookies.get('auth-token')
        }
    });
    const res = await response.json();
    console.log(res)
    if(res.validation){
        return res;
    }
    else{
        const cookies = Cookies.get();
        for(const cookie in cookies){
            Cookies.remove(cookie)
        }
        return res;
    }
}