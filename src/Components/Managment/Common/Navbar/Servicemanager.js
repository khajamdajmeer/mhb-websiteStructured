import React from 'react';
import './Servicemanager.css';
import iconmenu from '../../Imgs/menu-icon.png';
import logo from '../../Imgs/logo mhb.png';
import crosslogo from '../../Imgs/bgcross.png';
const Servicemanager = () => {


  var hamlogo = iconmenu;


    
  const handlehambtn = ()=>{
   const menu = document.getElementById('mymenu')
   const hambtn = document.getElementById('hamimg')
  if(menu.style.display==='none'){
      hambtn.src=crosslogo
      menu.style.display='flex'
  }
  else{
      menu.style.display='none'
      hambtn.src=iconmenu
  }

}
  return (
    <>
        <nav className='servienav'>
    <div className="container">
      <div className="menu-icon">
      <img id='logoimg' src={logo} alt="" />
      </div>
    {/* <ul className="menu" id='mymenu'>
        <li>Admin Login</li>
        <li>Manager Login</li>
        <li>Technician login</li>
      </ul> */}
      {/* <button className='hambutton' onClick={handlehambtn}>
            <img src={hamlogo} alt="" id='hamimg'/>
        </button>
     */}
    </div>
  </nav>
  {/* <div className="container1">
    <div className="heading"><h1>Welcome to the MHB Service</h1></div>
    <div className="centercontainer">
      this is center
    </div>

  </div> */}
    </>
  );
}

export default Servicemanager;
