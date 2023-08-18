import React, {  useEffect } from 'react';
import TechNavbar from '../TechNavbar/TechNavbar';
import { Outlet } from 'react-router-dom';
import { techAuthorization } from '../../../../ApiCalls/CommonCalls/Authorization';
const TechDashboard = () => {
  // const history= useNavigate();

  const token = localStorage.getItem('auth-token')
  // const level = localStorage.getItem('level')
  const checkauthorization = async()=>{
    if(token){
          await techAuthorization();
    }
    
  }

  useEffect(()=>{
    checkauthorization()
    // eslint-disable-next-line
  },[])
  return (
    <>
        <TechNavbar/>
      
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default TechDashboard;