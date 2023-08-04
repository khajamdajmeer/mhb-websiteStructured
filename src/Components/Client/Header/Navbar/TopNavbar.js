import React from 'react';
import './TopNavbar.css';
import logo from '../../imgClient/navlogo/leftlogo.png';
import locationicon from '../../imgClient/navlogo/location-icon.png';
import mailicon from '../../imgClient/navlogo/atrate-icon.png'
import callicon from "../../imgClient/navlogo/call-icon.png"

const TopNavbar = () => {
  return (
    <>
    <div className="navbar">
        <div className="navleft"><img src={logo} alt="" /></div>
     <div className="navright">
        <ul className="listright">
            <li id='phone'><div className="lileft"><img src={callicon} alt="" /></div>
            <div className="liright"><span className="orangecolor">Call for service</span><br /> 1122335566</div>
            </li>
            <li id='location'><div className="lileft"><img src={locationicon}alt="" /></div>
            <div className="liright"><span className="orangecolor">Our office location</span><br /> 1122335566</div>
            </li>
            <li id='email'><div className="lileft">
                <img src={mailicon} alt="" />
            </div>
            <div className="liright"><span className="orangecolor">send a Mail</span><br /> 1122335566</div>
            </li>
            
        </ul>
     
     
     </div>
     </div>
    </>
  );
}

export default TopNavbar;
