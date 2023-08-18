
// import dotenv from 'dotenv'
// dotenv.config();
// const host = process.env.SERVER_URL;
// const host = 'http://localhost:5001';
// const {host} = require('../Host.js')
// import {host} from '../Host'
const {host} = require('../Host')





export const AddRequest = async(data)=>{
    const res = await fetch(`${host}/api/client/service`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:data.name,
            mobileNumber:data.mobilenumber,
            Location:data.location,
            Address:data.address,
            ServiceDate:data.servicedate,
            ServiceType:data.servicetype,
            ServiceTime:data.servicetime
        })
        
    });
    const response = res.json();
    return response;
}