import React, { useState } from 'react';
import './ComplainPage.css'
import FindRequest from '../ComplainPageItems/FindRequest/FindRequest';
import DailyActivity from '../ComplainPageItems/DailyActivity/DailyActivity';

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
            </ul>
        </div>
        
       {component==='FindRequest' &&<FindRequest/>}
       {component==='DailyActivity'&&<DailyActivity/>}
       
      </div>
    </>
  );
}

export default ComplainPage;
