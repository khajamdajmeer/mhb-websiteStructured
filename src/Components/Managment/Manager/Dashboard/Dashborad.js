import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'
import DashNav from '../DashNav/DashNav';
import { Outlet } from 'react-router-dom';

const Dashborad = () => {
    const history = useNavigate();
    useEffect(()=>{
        const istoken = localStorage.getItem('auth-token')
        const level= localStorage.getItem('level')
        if(!istoken){
          history('/service')
        }
        else{
          switch(level){
            case 'L3': {
              history('/technician')
            break;  }
            default:{}
          }
        

        }
        
      })
  return (
    <>
    <DashNav/>
    <main>
      <Outlet/>
    </main>
    
    
    </>
  );
}

export default Dashborad;
