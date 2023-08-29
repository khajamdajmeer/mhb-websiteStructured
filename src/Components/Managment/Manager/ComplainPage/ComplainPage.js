import React, { useState } from 'react';
import './ComplainPage.css'
import FindRequest from '../ComplainPageItems/FindRequest/FindRequest';

const ComplainPage = () => {
    const [component,setComponent]=useState('')
    const handlecomponentchange = (name)=>{
        if(name==='raise_complain'){
            setComponent('FindRequest')
        }

    }
  return (
    <>
      <div className="ma-cplp-fullscreen">
        <div className="ma-cplp-header">
            <ul className="ma-cplp-ul">
                <li onClick={()=>handlecomponentchange('raise_complain')}>Raise Complain</li>
                <li>Deleted</li>
                <li>Inquery</li>
                <li>Complain</li>
            </ul>
        </div>
        
       {component==='FindRequest' &&<FindRequest/>}
       
      </div>
    </>
  );
}

export default ComplainPage;
