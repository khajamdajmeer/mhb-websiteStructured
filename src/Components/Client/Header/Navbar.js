import React from 'react';
import './Navbar.css'
import TopNavbar from './Navbar/TopNavbar';
import MainNavbar from './NavigateNavbar/MainNavbar';
const Navbar = () => {
  return (
   <>
   <div className="fullnavbar">

   <TopNavbar/>
   <MainNavbar/>
   </div>
   </>
  );
}

export default Navbar;
