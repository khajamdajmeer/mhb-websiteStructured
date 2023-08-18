import Cookies from 'js-cookie';
const {host} = require('../Host')


export const SerachTechDB = async(data)=>{
    const response = await fetch(`${host}/api/search/techdata`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":Cookies.set('auth-token')
        },
        body:JSON.stringify({
            type:data.type,
            data:data.data
        })
    })
    const res = await response.json();
    return res;

}


export const RequestSearch=async(data)=>{
    const response = await fetch(`${host}/api/search/requests`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "auth-token":Cookies.set('auth-token')
        },
        body:JSON.stringify({
            type:data.type,
            data:data.data
    })
    });
    const res = await response.json();
    return res;

}