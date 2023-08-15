import React from 'react';
import './Dashnav.css'
import hamicon from '../../Imgs/menu-icon.png'
import crosslogo from '../../Imgs/bgcross.png'
import logo from '../../Imgs/logo mhb.png'
import { Link, useNavigate } from 'react-router-dom';



const DashNav = () => {

  const history = useNavigate();


    
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

const handleprofilebtn = ()=>{
  // const profileelement = document.getElementById('profiledatabox');
  // if(profileelement.style.display==='none'){
  //   profileelement.style.display='block'
  // }
  // else{
  //   profileelement.style.display = 'none'
  // }
  localStorage.clear();
  history("/service")
}

  return (
    <>
    <nav className='dashnav'>
<div className="container">
  <div className="menu-icon">
  <img id='logoimg' src={logo} alt="" />
  </div>
  <div>
<ul className="menu" id='mymenu'>
    <li><Link className='Linktag' to='requests'>Requests</Link></li>
    <li><Link className='Linktag' to='techrequest'>Tech Requests</Link></li>
    <li><button  id='menulogoutbtn' onClick={handleprofilebtn}>logout</button></li>
    {/* <li>Data Search</li> */}
  </ul>

  </div>
  <button className='hambutton' onClick={handlehambtn}>
        <img src={hamicon} alt="" id='hamimg'/>
    </button>
<div className='profilecontainer' id='logoutbtnright'>
  <button className='profilebtn'  onClick={handleprofilebtn}>logout</button>
  {/* <div className="profilebox" id='profiledatabox'> 
  this is profile
  </div> */}
</div>
</div>
</nav>

</>
  );
}

export default DashNav;
