import Cookies from 'js-cookie';
import {host} from '../Host';

const header = {
    'Content-Type':'application/json',
    'auth-token':Cookies.get('auth-token')
}

export const GetCount=async(id)=>{
    const response = await fetch(`${host}/api/progress/reqcount/${id}`,{
        method:'GET',
        headers:header

    });
    const res =response.json();
    return res;

}
