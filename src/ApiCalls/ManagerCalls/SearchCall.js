import axios from 'axios';
import Cookies from 'js-cookie';
const {host} = require('../Host')


export const SerachTechDB = async(data)=>{
    const response = await fetch(`${host}/api/search/techdata`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token":Cookies.get('auth-token')
        },
        body:JSON.stringify({
            type:data.type,
            data:data.data
        })
    })
    const res = await response.json();
    return res;

}


export const RequestSearch=async(iptype,ipval)=>{
  try{  const response = await axios.post(`${host}/api/search/requests`,{type:iptype,
        data:ipval},{headers:{
            "Content-Type": "application/json",
                "auth-token":Cookies.get('auth-token')
        }})
   
   
    return response.data;
}catch(error){
        console.log(error);
        throw error;
    }

}


export const customerhistory=async(data)=>{
    try{  const response = await axios.post(`${host}/api/search/gethistory`,{id:data},{headers:{
              "Content-Type": "application/json",
                  "auth-token":Cookies.get('auth-token')
          }})
     
     
      return response.data;
  }catch(error){
          console.log(error);
          throw error;
      }
  
  }