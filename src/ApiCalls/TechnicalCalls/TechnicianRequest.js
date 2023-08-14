
import { host } from "../Host"
export const viewallTechReq = async()=>{

    const response = await fetch(`${host}/api/technician/viewtechRequest`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
        }
    });
    const res= await response.json();
    return res;

}

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