import React from "react";
import { Outlet } from "react-router-dom";

// base components
import Header from './base/Header'
import SideNav from './base/SideNav'
import Footer from "./base/Footer";

const Base = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SideNav />

        {/* pages will render here */}
        <Outlet />
        {/* pages will render here */}

        <Footer />
      </div>
    </>
  );
};

export default Base;
