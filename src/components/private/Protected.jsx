import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    let login = localStorage.getItem("login");
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
