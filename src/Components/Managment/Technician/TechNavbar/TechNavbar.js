import React from 'react';
import hamicon from '../../Imgs/menu-icon.png';
import logo from '../../Imgs/logo mhb.png'
import { Link, useNavigate } from 'react-router-dom';
import './TechNavbar.css'

const TechNavbar = () => {
    const history = useNavigate();

    const handlehambtn = ()=>{
        const menu = document.getElementById('mymenutech')
        // const hambtn = document.getElementById('hamimg')
       if(menu.style.display==='none'){
        //    hambtn.src=crosslogo
           menu.style.display='flex'
       }
       else{
           menu.style.display='none'
        //    hambtn.src=hamicon
       }
     
     }

     const handlelogout =()=>{
        localStorage.clear();
  history("/service")
     }



  return (
    <>
     <nav className='dashnavtech'>
<div className="containertech">
  <div className="menu-icontech">
  <img id='logoimgtech' src={logo} alt="" />
  </div>
  <div>
<ul className="menutech" id='mymenutech'>
    <li><Link className='Linktag' to='request' >Requests</Link></li>
    <li><Link className='Linktag' to='myrequests' >My Requests</Link></li>
    <li className='hamlogoutbtn'><button onClick={handlelogout}>Logout</button></li>
    {/* <li>Data Search</li> */}
  </ul>

  </div>
  <button className='hambuttontech' onClick={handlehambtn} >
        <img src={hamicon} alt="" id='hamimgtech'/>
    </button>
<div className='profilecontainertech'>
  <button className='profilebtntech'onClick={handlelogout} >logout</button>
  {/* <div className="profilebox" id='profiledatabox'> 
  this is profile
  </div> */}
</div>
</div>
</nav>
    </>
    
  );
}

export default TechNavbar
