
import {host} from '../Host'
import Cookies from 'js-cookie';

export const techAuthorization = async()=>{

    const response = await fetch(`${host}/api/authorization/technician`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            'auth-token':Cookies.get('auth-token')
        }
    });
    const res = await response.json()
    return res;

}