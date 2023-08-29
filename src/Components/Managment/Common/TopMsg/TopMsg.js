import React from 'react';
import './TopMsg.css';
import cross from '../../Imgs/bgcross.png'


const TopMsg = (props) => {

    const handleclose = props.handleclose;
  return (
    <>
      <div className="top-msgcontainer">
        <div className="top-msgbody">
            <div className="top-msg">{props.message}</div>
            <div className="top-msg"><button onClick={handleclose} className='top-msg-crossbtn'><img src={cross} alt="" /></button></div>
        </div>
      </div>
    </>
  );
}

export default TopMsg;
