import React, { useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { Outlet,  useNavigate } from 'react-router-dom';
import './AdminDashboar.css'

const AdminDashborad = () => {
  const history = useNavigate();

  //checking the validation
  useEffect(()=>{
    const token = localStorage.getItem('auth-token')
    const lvl = localStorage.getItem('level')
    if(!token||lvl!=='l1'){
      history('/loginadmin')
    }
  },[history])




  return (
    <>
      <AdminNavbar/>
      <main>
<Outlet/>

      </main>
    </>
  );
}

export default AdminDashborad;