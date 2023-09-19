import Cookies from "js-cookie";
import { host } from "../Host";
import axios from "axios";




const XLSX = require('xlsx')

const header = {
    'Content-Type': 'application/json',
    'auth-token': Cookies.get('auth-token')
}


export const ViewClients = async()=>{
    
    try{

        const response = await axios.get(`${host}/api/admin/Customers`,{
            headers:header
        });
        return response.data;

    }catch(err){
        console.error('An error occured',err);
        throw err;
    }
}

export const newDownload =(data)=>{

    const raw = data;
   
    const flatteneddata = raw.map(entry=>{
        return {_id: entry._id,
            name: entry.name,
            mobileNumber: entry.mobileNumber,
            // mobilenumberString: entry.mobilenumberString,
            Location: entry.Location,
            Address: entry.Address,
            Requestdate: entry.Requestdate.slice(3,15),
            Discription: entry.Discription
            ,ServiceType:entry.Service.type,
        ServiceDate: entry.Service.Date.slice(3,15),
    DeliveryDate: entry.Service.Delivery.slice(0,10),
    TechName: entry.Technicain.name,
    ManagerName: entry.forworded.name,
    }
    })
    var newWB = XLSX.utils.book_new();
    var newWS = XLSX.utils.json_to_sheet(flatteneddata);
    XLSX.utils.book_append_sheet(newWB,newWS,'sheet 1')
    XLSX.writeFile(newWB,'Service data.xls')
}


export const ViewRequest =async()=>{
        try{
            const res = await axios.get(`${host}/api/admin/db/requests`,{
                headers:header
            });
            console.log(res.data)
           
            return res.data;

        }catch(error){
            console.log(error);
            throw error;
        }
}


export const ClientId_DB = async()=>{
    try{
        const res = await axios.get(`${host}/api/admin/db/Clients`,{
            headers:header
        });
        return res.data;

    }catch(err){
        throw err;
    }
}
export const CleintDB_Download = async(data)=>{
    const raw = data;
   
    const flatteneddata = raw.map(entry=>{
        return {_id: entry._id,
            name: entry.name,
            mobileNumber: entry.mobileNumber,
    }
    })
    var newWB = XLSX.utils.book_new();
    var newWS = XLSX.utils.json_to_sheet(flatteneddata);
    XLSX.utils.book_append_sheet(newWB,newWS,'sheet 1')
    XLSX.writeFile(newWB,'customer data.xls')
}

export const client_history=async(id)=>{
    try{
        const res = await axios.get(`${host}/api/admin/db/client/${id}`,{
                headers:header
            })
            console.log(res.data)
            return res.data;

    }catch(error){
        console.log(error);
        throw error;
    }
} 


export const Deleted_req = async()=>{
    try{
        const res = await axios.get(`${host}/api/admin/db/deleted`,{
            headers:header
        });
        return res.data;

    }catch(err){
        throw err;
    }
}


export const Inquery_Data = async()=>{
    try{
        const res = await axios.get(`${host}/api/admin/db/inquery`,{
            headers:header
        });
        return res.data;
    }catch(error){
        console.log(error)
        throw error;
    }
}



export const insertNewCustomer=async(data)=>{
    try{
        const res = await axios.post(`${host}/api/admin/createcustomer`,{
                name:data.name,
                mobileNumber:data.mobileNumber,
                mobilenumberString:data.mobileNumber,Location:data.Location,
                Address:data.Address,Service:{type:data.ServiceType,Date:data.ServiceDate},
                Technicain:{name:data.Technicianid},
                Discription:data.Note,
                
            },{headers:header})
            return res.data;

    }catch(error){
        console.log(error);
    }

}