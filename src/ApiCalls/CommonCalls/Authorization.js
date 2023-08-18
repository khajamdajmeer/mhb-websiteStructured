
import {host} from '../Host'

export const techAuthorization = async()=>{

    const response = await fetch(`${host}/api/authorization/technician`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
        }
    });
    const res = await response.json()
    return res;

}