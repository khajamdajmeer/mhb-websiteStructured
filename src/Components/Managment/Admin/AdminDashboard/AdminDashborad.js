import React from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { Outlet } from 'react-router-dom';
import './AdminDashboar.css'

const AdminDashborad = () => {
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