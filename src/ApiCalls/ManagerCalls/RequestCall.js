
// const host = "http://localhost:5001";
const {host} = require('../Host')


export const ViewRequests = async()=>{
    const response = await fetch(`${host}/api/manager/requests`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
        }
    });
    const res = await response.json();
    return res;
}

export const UpdateRequest = async(data)=>{

    const response = await fetch(`${host}/api/manager/requests/update/${data._id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
            ,"auth-token":localStorage.getItem('auth-token')
        },
        body:JSON.stringify({
            name: data.name,
            mobileNumber: data.mobileNumber,
            Location: data.Location,
            Address: data.Address,
            ServiceType: data.ServiceType,
            ServiceDate: data.ServiceDate,
            ServiceTime: data.ServiceTime
        })
    });
    const res = await response.json();
    return res;
}

export const forwordRequest = async(data)=>{
    const response = await fetch(`${host}/api/manager/forword/${data._id}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
            ,"auth-token":localStorage.getItem('auth-token')
        },
     
    });
    const res = await response.json();
    return res;
} 

export const TechRequest = async()=>{
    const response = await fetch(`${host}/api/manager/techrequests`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
            ,"auth-token":localStorage.getItem('auth-token')
           }
    });
    const res = await response.json()
    return res;
}

