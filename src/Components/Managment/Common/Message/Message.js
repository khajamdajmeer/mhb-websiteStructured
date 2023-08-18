import React from 'react';
import './Message.css'
import { useNavigate } from 'react-router-dom';

const Message = (props) => {
    const history = useNavigate();

    const handleOk = (e)=>{
        history(props.navigate)
    }
    const showOk= props.showOk

  return (
    <div className='msggcontainer'>
     <div className="msgbody1">
        {/* <h2>Message</h2> */}
        <p>{props.message}</p>
        {showOk&&
        <button onClick={handleOk}>OK</button>
        }
     </div>

    </div>
  );
}

export default Message;
