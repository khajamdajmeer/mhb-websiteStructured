import React, {  useEffect } from 'react';
import TechNavbar from '../TechNavbar/TechNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { techAuthorization } from '../../../../ApiCalls/CommonCalls/Authorization';
const TechDashboard = () => {
  const history= useNavigate();

  const token = localStorage.getItem('auth-token')
  const checkauthorization = async()=>{
    if(token){
      const res = await techAuthorization();
      if(res){

      }
      else{
        history('/sevice')
      }
    }
    else{
      history('/service')
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