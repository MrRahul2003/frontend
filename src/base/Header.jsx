import React, { useContext } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

// Context Hooks
import { LoginContext } from "../components/context/LoginProvider";

const Header = () => {
  const { collapseSidebar } = useProSidebar();
  const { setusername, setemail, setloginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const logout = () => {
    setusername("");
    setemail("");
    setloginId("");
    localStorage.removeItem("login");
    localStorage.removeItem("loginId");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    alert("Logout Successful");
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src="/logo.jpeg" alt="Logo" />
            {/* <h2>AEGIS</h2> */}
          </a>
          <a href="index.html" className="logo logo-small">
            <img
              src="/assets/img/logo-small.png"
              alt="Logo"
              width={30}
              height={30}
            />
          </a>
        </div>
        <div className="menu-toggle">
          <a href="" id="toggle_btn" onClick={() => collapseSidebar()}>
            <i className="fas fa-bars" />
          </a>
        </div>

        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow new-user-menus">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtp36BtdqybuCc5plSuHOfDv_t5xRIUAHheEbviGy_uRD3sCZDa-eCAPHTICCphaFyMME&usqp=CAU"
                  width={31}
                />
                <div className="user-text">
                  <h6>{username}</h6>
                </div>
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtp36BtdqybuCc5plSuHOfDv_t5xRIUAHheEbviGy_uRD3sCZDa-eCAPHTICCphaFyMME&usqp=CAU"
                    alt="User Image"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>{username}</h6>
                  <p className="text-muted mb-0">{email}</p>
                </div>
              </div>
              <a className="dropdown-item" href="profile.html">
                My Profile
              </a>
              <a className="dropdown-item" href="inbox.html">
                Inbox
              </a>
              <a className="dropdown-item" href="login.html" onClick={logout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
