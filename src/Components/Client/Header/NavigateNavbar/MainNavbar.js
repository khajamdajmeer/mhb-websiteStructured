import React from 'react';
import './MainNavbar.css'
import iconmenu from '../../imgClient/navlogo/menu-icon.png'
import logo from '../../imgClient/navlogo/leftlogo.png';
import crosslogo from '../../imgClient/navlogo/bgcross.png'

const MainNavbar = () => {


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
    <nav>
    <div className="container">
      <div className="menu-icon1">
      <img src={logo} alt="" />
      </div>
    <ul className="menu" id='mymenu'>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
      <button className='hambutton' onClick={handlehambtn}>
            <img src={hamlogo} alt="" id='hamimg'/>
        </button>
    
    </div>
  </nav>
   </>
  );
}

export default MainNavbar;
