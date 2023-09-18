import React, { useState } from 'react';
import './Dashnav.css'
import hamicon from '../../Imgs/menu-icon.png'
import crosslogo from '../../Imgs/bgcross.png'
import logo from '../../Imgs/logo mhb.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';



const DashNav = () => {

  const history = useNavigate();
  useEffect(() => {
const level = Cookies.get('level')
if(level==='l2'){
  history('/service')

}
else if(level==='l3'){
  history('/technician/request')
}
else if(level==='l1'){
  // history('/admindashboard/emplooys')
}

  }, [history])


    
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

  const cookies = Cookies.get();
  for(const cookie in cookies){
    Cookies.remove(cookie)
  }
  history("/service")
}

const [link,setLink] = useState('')
const handleactiveLink =(data)=>{
setLink(data)
// handlehambtn();
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
    <li><Link className={link==='request' ? 'Linktag activeLinktag':'Linktag'} onClick={()=>handleactiveLink('request')} to='requests'>Requests</Link></li>
    <li><Link className={link==='Pending' ? 'Linktag activeLinktag':'Linktag'} onClick={()=>handleactiveLink('Pending')} to='pending'>pending</Link></li>
    <li><Link className={link==='Tech Req' ? 'Linktag activeLinktag':'Linktag'} onClick={()=>handleactiveLink("Tech Req")} to='techrequest'>Tech Requests</Link></li>
    <li><Link className={link==='Review' ? 'Linktag activeLinktag':'Linktag'} onClick={()=>handleactiveLink('Review')} to='reviewreq'>Review</Link></li>
    <li><Link className={link==='Query' ? 'Linktag activeLinktag':'Linktag'} onClick={()=>handleactiveLink('Query')} to='Querys'>Querys</Link></li>
    <li><button  id='menulogoutbtn' className='logoutbtncommon' onClick={handleprofilebtn}>logout</button></li>
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
