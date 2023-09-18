import React, { useState } from 'react';
import './TechReqFinish.css'
// import { finishReq } from '../../../../ApiCalls/TechnicalCalls/TechnicianRequest';

const TechReqFinish = (props) => {
    
    const [data,setData]=useState({discription:''});

    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const id = props.newdata._id

    const handlefinish = props.handleComplete

  return (
    <>
    <div className="tech-finish-full">

        <h1>hi</h1>
    <div className="tech-finish-center">
    <div className="tech-my-name">
               Name: {props.name}

               </div>
               <div className="tech-finish-data">
                <ul>
                    <li className='tech-finish-left'>Name :</li>
                    <li className='tech-finish-right'>{props.newdata.name}</li>
                </ul>
                <ul>
                    <li className='tech-finish-left'>Mobilenumber :</li>
                    <li className='tech-finish-right'>{props.newdata.mobileNumber}</li>
                </ul><ul>
                    <li className='tech-finish-left'>Location :</li>
                    <li className='tech-finish-right'>{props.newdata.Location}</li>
                </ul><ul>
                    <li className='tech-finish-left'>Address :</li>
                    <li className='tech-finish-right'>{props.newdata.Address}</li>
                </ul>
                <ul>
                    <li className='tech-finish-left'>ServiceType :</li>
                    <li className='tech-finish-right'>{props.newdata.Service.type}</li>
                </ul>
                <ul>
                    <li className='tech-finish-left'>ServiceDate:</li>
                    <li className='tech-finish-right'>{props.newdata.Service.Date}</li>
                </ul>

                <ul className='tech-finish-displayblock'>
                <li className='tech-finish-left'> <label htmlFor="Discription" className='tech-finishlabel'>Discription</label></li>
                    <li className='tech-finish-right'><textarea type="textarea" className='tech-finishtextarea' name='discription'  onChange={onchange} value={data.discription} placeholder='Enter the discription' rows={4}/></li>
                </ul>
              
               
                
                <div className="tech-finish-btns">
                    <button className='btncancle' onClick={props.handlecancle}>cancle</button>
                    <button className='btncomplete' onClick={()=>handlefinish({_id:id,discription:data.discription})} >complete</button>

                </div>
               </div>
    </div>

    </div>
    </>
  );
}

export default TechReqFinish;
