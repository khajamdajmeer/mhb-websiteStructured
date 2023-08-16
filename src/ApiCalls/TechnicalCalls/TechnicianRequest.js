
import { host } from "../Host"


export const AcceptRequest = async(data)=>{
    const response = await fetch(`${host}/api/technician/acceptreq/${data}`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
        }
    })
    const res= await response.json();
    return res;
}


export const ViewMyReq = async()=>{
    const response = await fetch(`${host}/api/technician/viewmyreq`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')

        }
    })
    const res= await response.json();
    return res;
}

export const finishReq = async(data)=>{
    const response = await fetch(`${host}/api/technician/finishreq/${data._id}`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
        },
        body:JSON.stringify({
            discription:data.discription
          })
    })
    const res = await response.json();
    return res;
}