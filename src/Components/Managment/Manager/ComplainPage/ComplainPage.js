import React, { useState } from 'react';
import './ComplainPage.css'
import FindRequest from '../ComplainPageItems/FindRequest/FindRequest';
import DailyActivity from '../ComplainPageItems/DailyActivity/DailyActivity';
import DeletedReq from '../DeletedReq/DeletedReq';
import Inquery from '../ComplainPageItems/Inquery/Inquery';

const ComplainPage = () => {
    const [component,setComponent]=useState('')
    const handlecomponentchange = (name)=>{
       
            setComponent(name)

    }
  return (
    <>
      <div className="ma-cplp-fullscreen">
        <div className="ma-cplp-header">
            <ul className="ma-cplp-ul">
                <li onClick={()=>handlecomponentchange('FindRequest')}>Raise Complain</li>
                
                <li onClick={()=>handlecomponentchange('DailyActivity')}>Tasks</li>
                <li onClick={()=>handlecomponentchange('DeletedData')}>Deleted Data</li>
                <li onClick={()=>handlecomponentchange('Inquery')}>Inquery</li>
            </ul>
        </div>
        
       {component==='FindRequest' &&<FindRequest/>}
       {component==='DailyActivity'&&<DailyActivity/>}
       {component==='DeletedData'&&<DeletedReq/>}
       {component==='Inquery'&&<Inquery/>}
       
      </div>
    </>
  );
}

export default ComplainPage;
