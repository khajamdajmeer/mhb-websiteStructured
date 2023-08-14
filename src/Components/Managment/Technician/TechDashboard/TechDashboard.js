import React from 'react';
import TechNavbar from '../TechNavbar/TechNavbar';
import { Outlet } from 'react-router-dom';

const TechDashboard = () => {
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