import React, { useEffect, useState } from 'react';
import './ViewRequest.css'
import { ViewRequests } from '../../../../ApiCalls/ManagerCalls/RequestCall';

const ViewRequest = () => {

    const [data,setData] = useState([
        { _id: "",    name: "",    mobileNumber: "",    Location: "",    Address: "",    ServiceDate: "",    ServiceTime: "",
          Requestdate: "",
          __v: ""}
        ])

    const onMount = async()=>{
        const res = await ViewRequests();
        setData(res)
    }

    useEffect(()=>{
        onMount();

    })
  return (
    <>
   <div className="viewreq">
   <div className="reqcenter">
    <div className="reqleft">
        <div className="reqhead">
        <div>Name</div>
        <div>Mobilenumber</div>
        </div>
        {
            data.map((ele,index)=>{
                return(
<div className="maps">
            <div className="mapname">{ele.name}</div>
            <div className="mapnumber">{ele.mobileNumber}</div>
        </div>
                )
            })
        }
        
    </div>
    <div className="reqright">
        this is right
    </div>
   </div>
   </div>
    </>
   
  );
}

export default ViewRequest;