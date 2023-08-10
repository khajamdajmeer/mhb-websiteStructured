import React from 'react';
import './Dashnav.css'
import hamicon from '../../Imgs/menu-icon.png'
import crosslogo from '../../Imgs/bgcross.png'
import logo from '../../Imgs/logo mhb.png'
import { Link } from 'react-router-dom';



const DashNav = () => {



    
  const handlehambtn = ()=>{
   const menu = document.getElementById('mymenu')
   const hambtn = document.getElementById('hamimg')
  if(menu.style.display==='none'){
      hambtn.src=crosslogo
      menu.style.display='flex'
  }
  else{
      menu.style.display='none'
      hambtn.src=hamicon
  }

}
  return (
    <>
    <nav className='dashnav'>
<div className="container">
  <div className="menu-icon">
  <img id='logoimg' src={logo} alt="" />
  </div>
<ul className="menu" id='mymenu'>
    <li><Link className='Linktag' to='/dashboard/requests'>Requests</Link></li>
    <li><Link className='Linktag' to='/dashboard/TechRequests'>Tech Requests</Link></li>
    <li>Data Search</li>
  </ul>
  <button className='hambutton' onClick={handlehambtn}>
        <img src={hamicon} alt="" id='hamimg'/>
    </button>

</div>
</nav>

</>
  );
}

export default DashNav;
