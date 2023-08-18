import React,{useEffect} from 'react';
import './AdminNavbar.css'
import logo from '../../Imgs/logo mhb.png'
import hamicon from '../../Imgs/menu-icon.png'
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const history = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('auth-token')
    const lvl = localStorage.getItem('level')
    if(!token||lvl!=='l1'){
      localStorage.clear();
      history('/loginadmin')
    }
  },[history])


    const handlelogout = ()=>{
        localStorage.clear();
        history('/loginadmin')
    }


    
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




  return (
  <>
    <nav className='dashnavtech'>
<div className="containertech">
  <div className="menu-icontech">
  <img id='logoimgtech' src={logo} alt="" />
  </div>
  <div>
<ul className="menutech" id='mymenutech'>
    <li><Link className='Linktag' to='emplooys' >Emplooys</Link></li>
    <li><Link className='Linktag' to='clients' >Clients</Link></li>
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

export default AdminNavbar;
