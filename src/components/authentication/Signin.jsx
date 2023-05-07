import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// api
import { addSignin } from "../Api/Login";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Signin = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

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

    if (userType == "admin" && secretKey != "abc") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Secret Key!",
      });
    } else {
      const { username, email, password } = Signin;
      const login_addingdate = new Date().toLocaleString();

      const data = {
        username: username,
        email: email,
        password: password,
        userType: userType,
        login_addingdate: login_addingdate,
      };

      if (username === "" || email === "" || password === "") {
        Swal.fire("Enter all Details before procedding!");
      } else {
        const response = await addSignin(data);
        console.log("sending Signin Data", response.data);

        if (response.status === 200) {
          Swal.fire(
            "Good job!",
            `New ${userType} added successfully!`,
            "success"
          );
          document.getElementById("addsigninform").reset();
          navigate("/authentication/login");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }
      }
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
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={(e) => setUserType(e.target.value)}
                        value="user"
                        name="userType"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        User
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={(e) => setUserType(e.target.value)}
                        value="admin"
                        name="userType"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Admin
                      </label>
                    </div>
                  </div>

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
                      type="email"
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
                      type="password"
                      onChange={insertFields}
                      autoComplete="false"
                      name="password"
                    />
                    <span className="profile-views feather-eye toggle-password" />
                  </div>

                  {userType === "admin" ? (
                    <div className="form-group">
                      <label>
                        Secret Key <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control pass-input"
                        type="password"
                        onChange={(e) => setSecretKey(e.target.value)}
                        autoComplete="false"
                        name="secretkey"
                      />
                      <span className="profile-views feather-eye toggle-password" />
                    </div>
                  ) : null}
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      placeholder="Secret Key"
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
