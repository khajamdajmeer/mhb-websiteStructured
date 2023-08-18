import React, { useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { Outlet,  useNavigate } from 'react-router-dom';
import './AdminDashboar.css'
import Cookies from 'js-cookie';

const AdminDashborad = () => {
  const history = useNavigate();

  //checking the validation
  useEffect(()=>{
    const token = Cookies.get('auth-token')
    const lvl = Cookies.get('level')
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