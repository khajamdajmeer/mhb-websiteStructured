// const host = "http://localhost:5001";
const {host} = require('../Host')


export const SerachTechDB = async(data)=>{
    const response = await fetch(`${host}/api/search/techdata`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
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
            "auth-token":localStorage.getItem('auth-token')
        },
        body:JSON.stringify({
            type:data.type,
            data:data.data
    })
    });
    const res = await response.json();
    return res;

}