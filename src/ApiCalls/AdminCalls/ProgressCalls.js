import axios from 'axios';
import Cookies from 'js-cookie';
import { host } from '../Host';

const header = {
    'Content-Type': 'application/json',
    'auth-token': Cookies.get('auth-token')
};

export const GetCount = async (id) => {
    try {
        const response = await axios.get(`${host}/api/progress/reqcount/${id}`, {
            headers: header
        });
        return response.data;
    } catch (error) {
        // Handle error here
        console.error('An error occurred:', error);
        return ({message:'error occured',success:false})        

    }
};

export const GetfullDetail = async(id)=>{
    try {
        const response = await axios.get(`${host}/api/progress/getdetails/${id}`, {
            headers: header
        });
        return response.data;
    } catch (error) {
        // Handle error here
        console.error('An error occurred:', error);
        return ({message:'error occured',success:false})        

    }
};


export const getcompleteTasks = async(id)=>{
    try{
        const res = await axios.get(`${host}/api/progress/getcompleteTasks/${id}`,{headers:header})
        return res.data;

    }catch(error){
        console.log(error);
        return ({message:'error occured',success:false})        

    }
}

export const getPendingTechReq = async(id)=>{
    try{
        const res = await axios.get(`${host}/api/progress/pendingtechreq/${id}`,{headers:header})
        return res.data;

    }catch(error){
        console.log(error);
    return ({message:'error occured',success:false})        
    }
}

export const getPendingTasks = async(id)=>{
    try{
        const res = await axios.get(`${host}/api/progress/getpendingtasks/${id}`,{headers:header})
        return res.data;

    }catch(error){
        console.log(error);
    return ({message:'error occured',success:false})        
    }
}


export const getManagerdata = async()=>{
    try{
        const res = await axios.get(`${host}/api/progress/MangaerData`,{headers:header})
        return res.data
    }catch(error){
        console.log(error)
        return
    }
}

export const InqueryToTask = async(id,mid,mname,note)=>{
    try{
        const res = await axios.post(`${host}/api/progress/InqueryToTask/${id}`,{
            mid:mid,
            mname:mname,
            note:note
        },{headers:header})
        return res.data;

    }catch(error){
        console.log(error);
        return
    }
}


export const deleteToTask = async(id,mid,mname,note)=>{
    try{
        const res = await axios.post(`${host}/api/progress/deleteToTask/${id}`,{
            mid:mid,
            mname:mname,
            note:note
        },{headers:header})
        return res.data;

    }catch(error){
        console.log(error);
        return
    }
}