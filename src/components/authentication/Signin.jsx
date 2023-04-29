import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addSignin } from "../Api/Login";

const Signin = () => {
  const navigate = useNavigate();

  const [Signin, setSignin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignin((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const { username, email, password } = Signin;
    const login_addingdate = new Date().toLocaleString();

    const data = {
      username: username,
      email: email,
      password: password,
      login_addingdate: login_addingdate,
    };

    const response = await addSignin(data);
    console.log("sending Signin Data", response.data);
    // setAllEnquiry(response.data);

    console.log(response);

    if (response.status !== 200) {
      alert("invalid credentials");
    }else {
      alert("New Signin added successfully");
      document.getElementById("addsigninform").reset();
      navigate("/authentication/login");
    }
  };

  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img className="img-fluid" src="/signin.jpg" alt="Logo" />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Welcome to Aegis Projects</h1>
                <form id="addsigninform">
                  <div className="form-group">
                    <label>
                      User Name <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={insertFields}
                      autoComplete="false"
                      name="username"
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle" />
                    </span>
                  </div>

                  <div className="form-group">
                    <label>
                      Email <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={insertFields}
                      autoComplete="false"
                      name="email"
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle" />
                    </span>
                  </div>

                  <div className="form-group">
                    <label>
                      Password <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control pass-input"
                      type="text"
                      onChange={insertFields}
                      autoComplete="false"
                      name="password"
                    />
                    <span className="profile-views feather-eye toggle-password" />
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      onClick={submitForm}
                    >
                      Signin
                    </button>
                  </div>
                </form>
                {/* 
                <div className="login-or">
                  <span className="or-line" />
                  <span className="span-or">or</span>
                </div>
                <div className="social-login">
                  <a href="#">
                    <i className="fab fa-google-plus-g" />
                  </a>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
