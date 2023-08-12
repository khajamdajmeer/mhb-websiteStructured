

// const host = 'http://localhost:5001';
// import {host} from '../Host'
const {host} = require('../Host')

export const Logincall = async(username,password)=>{
    const response = await fetch(`${host}/api/emplooy/login`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            username:username,
            password:password
        })

    });
    const res = await response.json();
    return res;
}