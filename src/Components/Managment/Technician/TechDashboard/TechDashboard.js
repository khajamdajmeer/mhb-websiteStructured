import React, { useCallback, useEffect } from 'react';
import TechNavbar from '../TechNavbar/TechNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { async } from 'q';
import { techAuthorization } from '../../../../ApiCalls/CommonCalls/Authorization';
const TechDashboard = () => {
  const history= useNavigate();

  const token = localStorage.getItem('auth-token')
  const checkauthorization = useCallback(async()=>{
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
  },[token,history])

  useEffect(()=>{
    checkauthorization()
  },[checkauthorization])
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