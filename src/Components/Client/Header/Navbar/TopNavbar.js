import React from 'react';
import './TopNavbar.css';
import mailicon from '../../imgClient/navlogo/atrate-icon.png'
import callicon from "../../imgClient/navlogo/call-icon.png";
import logo from '../../imgClient/navlogo/MYLOGO.jpg'

const TopNavbar = () => {
  return (
    <>
    <div className="navbar">
        <div className="navleft"><img src={logo} alt="" /></div>
     <div className="navright">
        <ul className="listright">
        <li id='phone'><div className="lileft"><img src={callicon} alt="" /></div>
            <div className="liright"><span className="orangecolor">Call for Service</span><br /> 8686303089</div>
            </li>  <li id='phone'><div className="lileft"><img src={callicon} alt="" /></div>
            <div className="liright"><span className="orangecolor">Office Number</span><br /> 8919168521</div>
            </li>
            
            <li id='email'><div className="lileft">
                <img src={mailicon} alt="" />
            </div>
            <div className="liright"><span className="orangecolor">Send a Mail</span><br /> mhbmech326@gmail.com</div>
            </li>
            
        </ul>
     
     
     </div>
     </div>
    </>
  );
}

export default TopNavbar;
