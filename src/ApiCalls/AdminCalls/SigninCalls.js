
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
        localStorage.setItem('auth-token',res.Token)
        localStorage.setItem('level','l1')
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
            'auth-token':localStorage.getItem('auth-token')
        }
    });
    const res = await response.json();
    console.log(res)
    if(res.validation){
        return res;
    }
    else{
        localStorage.clear();
        return res;
    }
}