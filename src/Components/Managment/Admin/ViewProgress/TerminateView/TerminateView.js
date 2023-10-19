import React,{useState} from 'react';

import './TerminateView.css'
const TerminateView = (props) => {

// const terminate = props.terminatefunction;
const {name,mobile,email,role}=props.data;


//logic to handlethe change in radio button
const [radio,setRadio]=useState(false)
const handlechangeradio=(e)=>{
    setRadio(e.target.checked)
}

const handleterminate= ()=>{
    if(radio){
        props.terminatefunction();
        props.handleclose();
    }
    
}
  return (
    <>
    <div className="ad-terv-screen">
        <div className="ad-terv-center">
           <h2 className="ad-terv-head">
            confirmation
           </h2>
           <div className="ad-terv-body"> 
            <ul>
                <li>name</li>
                <li>{name}</li>
            </ul>
            <ul>
                <li>mobilenumber</li>
                <li>{mobile}</li>
            </ul>
            <ul>
                <li>email</li>
                <li>{email}</li>
            </ul>
            <ul>
                <li>Designation</li>
                <li>{role}</li>
            </ul>
            <ul className='unflexul'>
                <li><input value={radio} onChange={handlechangeradio} type="checkbox" name="radio" id="" /></li>
                <li>Terminate Emplooy?</li>
            </ul>
            <ul className='unflexul terviewbtnsul'>
                <li><button onClick={props.handleclose}>cancle</button></li>
                <li><button className='terminatebtn' onClick={handleterminate}>Terminate</button></li>
            </ul>


           </div>
        </div>
    </div>
      
    </>
  );
}

export default TerminateView;
