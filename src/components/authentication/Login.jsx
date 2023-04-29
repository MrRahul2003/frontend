import React, { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addLogin } from "../Api/Login";
import { LoginContext } from "../context/LoginProvider";

const Login = () => {
  const navigate = useNavigate();

  const { username, setusername, email, setemail, loginId, setloginId } = useContext(LoginContext);

  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });

  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      navigate("/");
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const { email, password } = Login;

    const data = {
      email: email,
      password: password,
    };

    const response = await addLogin(data);
    console.log("sending Login Data", response.data);

    console.log(response);

    if (response.status !== 200) {
      alert("invalid credentials");
    } else {
      alert("New Login added successfully");   
         
      localStorage.setItem('login', true);
      localStorage.setItem('loginId', response.data.loginId);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('username', response.data.username);

      // navigate("/");

      setloginId(response.data.loginId);
      setemail(response.data.email);
      setusername(response.data.username);


      document.getElementById("addloginform").reset();
      navigate("/pipeline");
    }
  };

  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img className="img-fluid" src="/login.jpg" alt="Logo" />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Welcome to Aegis Projects</h1>
                <form id="addloginform">
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
                      Login
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

export default Login;
