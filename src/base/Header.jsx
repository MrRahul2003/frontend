import React, { useContext } from "react";
import { useProSidebar } from "react-pro-sidebar";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Header = () => {
  const MySwal = withReactContent(Swal);

  const { collapseSidebar } = useProSidebar();

  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  let login = localStorage.getItem("login");

  const logout = async () => {
    localStorage.removeItem("login");
    localStorage.removeItem("loginId");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    await Swal.fire("Good job!", `Logged out successfully!`, "success");
    window.location.reload(false);
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src="/logo.jpeg" alt="Logo" />
          </a>
          <a href="index.html" className="logo logo-small">
            <img src="/logo.jpeg" alt="Logo" width={30} height={30} />
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
                <img className="rounded-circle" src="/logo.jpeg" width={31} />
                <div className="user-text">
                  <h6>{username}</h6>
                </div>
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src="/logo.jpeg"
                    alt="User Image"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>{username}</h6>
                  <p className="text-muted mb-0">{email}</p>
                </div>
              </div>
              {login === "true" ? (
                <a className="dropdown-item" href="" onClick={logout}>
                  Logout
                </a>
              ) : null}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
