
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


export const GetTechDetails = async()=>{
    const response = await fetch(`${host}/api/track/findtechnician`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        }
    })
    const res = await response.json()
    return res
}

export const PushToTech = async(data)=>{
    const response = await fetch(`${host}/api/track/assign/${data.id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        },
        body:JSON.stringify({
            tid:data.tid
            
        })
    });
    const res = await response.json()
    return res
}

export const GetTechReq = async()=>{
    const response = await fetch(`${host}/api/track/viewtechreq`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            ,'auth-token':localStorage.getItem('auth-token')
        }
    });
    const res = await response.json()
    return res;
    
}

export const GetReviewReq = async()=>{

    const response = await fetch(`${host}/api/track/reviewreq`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            ,'auth-token':localStorage.getItem('auth-token')
        }
    });
    const res = await response.json()
    return res;
}

export const PushToFinished = async(id)=>{
    const response = await fetch(`${host}/api/track/finishreq/${id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        }
        
    })
    const res = await response.json();
    return res;

}

export const DeleteReq = async(data)=>{
    const response = await fetch(`${host}/api/track/delete/${data.id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        },
        body:JSON.stringify({reason:data.reason})
    });
    const res = await response.json();
    return res;

}

export const RevertReq = async(data)=>{
    const response = await fetch(`${host}/api/track/revert/${data.rid}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token') 
        },body:JSON.stringify({id:data.tid})

    })
    const res = await response.json();
    return res;
}



