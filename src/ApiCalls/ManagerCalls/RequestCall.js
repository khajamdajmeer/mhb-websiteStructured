import axios from 'axios';
import Cookies from 'js-cookie';

const {host} = require('../Host')


export const ViewRequests = async()=>{
    // console.log(Cookies.get('auth-token'))
    const response = await fetch(`${host}/api/manager/requests`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "auth-token": Cookies.get('auth-token')
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
            ,"auth-token": Cookies.get('auth-token')
        },
        body:JSON.stringify({
            name: data.name,
            mobileNumber: data.mobileNumber,
            Location: data.Location,
            Address: data.Address,
            ServiceType: data.ServiceType,
            ServiceDate: data.ServiceDate,
            ServiceTime: data.ServiceTime,
            Note:data.Note
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
            'auth-token': Cookies.get('auth-token')
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
            'auth-token': Cookies.get('auth-token')
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
            ,'auth-token': Cookies.get('auth-token')
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
            ,'auth-token': Cookies.get('auth-token')
        }
    });
    const res = await response.json()
    return res;
}

export const PushToFinished = async(data)=>{
    const response = await fetch(`${host}/api/track/finishreq/${data.id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token': Cookies.get('auth-token')
        },
        body:JSON.stringify({
            Discription:data.Discription
        })
        
    })
    const res = await response.json();
    return res;

}

export const DeleteReq = async(data)=>{
    const response = await fetch(`${host}/api/track/delete/${data.id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token': Cookies.get('auth-token')
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
                'auth-token': Cookies.get('auth-token') 
            },body:JSON.stringify({id:data.tid})
    
        })
 
        const res = await response.json();
        return res;
   
}



export const PendingRequest = async(id)=>{
    const response = await fetch(`${host}/api/manager/pending/${id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
            ,'auth-token': Cookies.get('auth-token')
        }
    });
    const res = await response.json()
    return res;

}

export const getPendingReq = async()=>{
    try{const response = await axios.get(`${host}/api/manager/pendingdata`,{
        headers:{
            'Content-Type':'application/json',
            'auth-token':Cookies.get('auth-token')
        }
    })
    return response.data
}
catch(err){
    console.error(err)
    throw err
}
}
const header = {
    'Content-Type': 'application/json',
    'auth-token': Cookies.get('auth-token')
}

export const ForwordPendingReq = async (rid, data) => {
    try {
        const response = await axios.post(`${host}/api/manager/pendingforword/${rid}`, {
            tid: data.tid,
            Note: data.Note
        }, {
            headers: header // Move the headers to this level
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}



export const CreateReqSendtoPending = async(data)=>{
 try{  const response= await axios.post(`${host}/api/manager/createpending`,{
        data:data
    },{
        headers:header
    }
    );
    return response.data;}catch(err){
        console.error(err)
    }
}

export const CreateReqandForword = async(data)=>{
    try{  const response= await axios.post(`${host}/api/manager/createforword`,{
           data:data
       },{
           headers:header
       }
       );
       return response.data;}catch(err){
           console.error(err)
       }
   }

//    

export const AcceptTechReq = async(id)=>{
    try{  const response= await axios.post(`${host}/api/manager/acceptfortech/${id}`,{
    },
    {
           headers:header
       }
       );
       return response.data;
    }catch(err){
           console.error(err)
       }
   }


   export const TechfinishReq = async(data)=>{
    const response = await fetch(`${host}/api/technician/completedreq/${data}`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":Cookies.get('auth-token')
        },
        body:JSON.stringify({
            discription:''
          })
    })
    const res = await response.json();
    return res;
}

export const Create_Inquery_Data = async(data)=>{
    try{
        const res = await axios.post(`${host}/api/manager/inqueryrequest`,{
            name:data.name,
            mobileNumber:data.mobileNumber,
            Location:data.Location,
            Address:data.Address,
            Note:data.Note
        },{
            headers:{
                "Content-Type": "application/json",
                "auth-token":Cookies.get('auth-token')
            }
        })
        return res.data;

    }catch(error){
        console.log(error);
        throw error;
    }
}


export const raisecomplainCall = async(id,reason)=>{
    try{
        const res = await axios.post(`${host}/api/track/raisecomplain/${id}`,{note:reason},{
            headers:header
        });
        return res.data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getTasks = async()=>{
    try{
        const res = await axios.get(`${host}/api/track/getTasks`,{
            headers:header
        })
        return res.data

    }catch(error){
        console.log(error);
        throw error;
    }
}


export const finshTask = async(id,note)=>{
try{
    const res = await axios.put(`${host}/api/track/finishtask/${id}`,{
        note:note
    },{headers:header})
    return res.data
}catch(err){
    console.log(err)
    throw err;
}
}