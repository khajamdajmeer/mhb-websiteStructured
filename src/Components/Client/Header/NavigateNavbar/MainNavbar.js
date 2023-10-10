import React from 'react';
import './MainNavbar.css'
import iconmenu from '../../imgClient/navlogo/menu-icon.png'
import logo from '../../imgClient/navlogo/leftlogo.png';
import crosslogo from '../../imgClient/navlogo/bgcross.png'
import { Link } from 'react-router-dom';

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

 const handleHomeBtn =()=>{
  const home= document.getElementById('iamhome')
  if(home){
    home.scrollIntoView({behavior:'smooth'})
  }
 }

 const handleAboutBtn = ()=>{
  const about = document.getElementById('iamabout');
  if(about){about.scrollIntoView({behavior:'smooth'})

  }
 }
  const handleServicBtn = ()=>{
  const service = document.getElementById('iamservice');
  if(service){service.scrollIntoView({behavior:'smooth'})

  }
 }

const handleBookingBtn =()=>{
  const booking = document.getElementById('bookingContainer');
  if(booking){
    booking.scrollIntoView({behavior:'smooth'})
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
        <li><button onClick={handleHomeBtn}>Home</button></li>
        <li><button onClick={handleAboutBtn}>About</button></li>
        <li><button onClick={handleServicBtn}>Service</button></li>
        <li><button onClick={handleBookingBtn}>Booking</button></li>
        <li><button>Contact</button></li>
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
