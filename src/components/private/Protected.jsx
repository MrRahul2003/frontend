import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const admin = "admin@gmail.com";
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    let login = localStorage.getItem("login");
    const loginId = localStorage.getItem("loginId");
    const email = localStorage.getItem("email");
    if (!login) {
      console.log("not logged in");
      navigate("/authentication/login");
    }
  }, [Component]);

  return (
    <div>
      <Component />
    </div>
  );
}; 

export default Protected;
