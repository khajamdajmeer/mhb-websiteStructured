import Cookies from "js-cookie";
import { host } from "../Host";
import axios from "axios";

const XLSX = require('xlsx')

const header = {
    'Content-Type': 'application/json',
    'auth-token': Cookies.get('auth-token')
};

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
    XLSX.writeFile(newWB,'customer data.xls')
}