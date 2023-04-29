import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div style={{ display: "flex", height: "100%" }}>
            <Sidebar>
              <li className="menu-title mt-3">
                <span>Pre Sales</span>
              </li>
              <Menu>
                {/* ----------------------------- Pipeline---------------------------------- */}
                <NavLink
                  to="/pipeline"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem icon={<i className="fas fa-th"></i>}>
                    <span> Pipeline</span>
                  </MenuItem>
                </NavLink>
                {/* ----------------------------------------------------------------------- */}
                {/* ----------------------------- Contacts ---------------------------------- */}
                <SubMenu
                  label="Contacts"
                  icon={<i className="fas fa-address-book"></i>}
                >
                  <NavLink
                    to="/contacts/showcontacts"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Show
                      Contacts
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="/contacts/addcontacts"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Add
                      Contact
                    </MenuItem>
                  </NavLink>
                </SubMenu>
                {/* ------------------------------------------------------------------------- */}
                {/* ----------------------------- Company---------------------------------- */}
                <SubMenu
                  label="Company"
                  icon={<i className="fas fa-suitcase"></i>}
                >
                  <NavLink
                    to="/company/showcompanies"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Show
                      Company
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="/company/addcompany"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Add
                      Company
                    </MenuItem>
                  </NavLink>
                </SubMenu>
                {/* ------------------------------------------------------------------------- */}
                <li className="menu-title mt-3">
                  <span>Sales</span>
                </li>
                {/* ----------------------------- Authentication ---------------------------------- */}
                <SubMenu
                  label="Authentication"
                  icon={<i className="fas fa-envelope"></i>}
                >
                  <NavLink
                    to="/authentication/signin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>signin
                    </MenuItem>
                  </NavLink>

                  <NavLink
                    to="/authentication/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>login
                    </MenuItem>
                  </NavLink>
                </SubMenu>
                {/* ------------------------------------------------------------------------- */}
                {/* ----------------------------- Enquiry ---------------------------------- */}
                <SubMenu
                  label="Enquiry"
                  icon={<i className="fas fa-envelope"></i>}
                >
                  <NavLink
                    to="/enquirysales/showenquiry"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Show
                      Enquiry
                    </MenuItem>
                  </NavLink>
                </SubMenu>
                {/* ------------------------------------------------------------------------- */}
                {/* ----------------------------- Vendors ---------------------------------- */}
                <SubMenu
                  label="Vendors"
                  icon={<i className="fas fa-users"></i>}
                >
                  <NavLink
                    to="/vendors/showvendors"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Show
                      Vendors
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="/vendors/addvendors"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Add
                      Vendors
                    </MenuItem>
                  </NavLink>
                </SubMenu>
                {/* ------------------------------------------------------------------------- */}
                {/* ----------------------------- Inventory ---------------------------------- */}
                <SubMenu
                  label="Inventory"
                  icon={<i className="fas fa-cart-arrow-down"></i>}
                >
                  <NavLink
                    to="/products/showproducts"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Show
                      Products
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="/products/addproducts"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Add
                      Products
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="/subproducts/addsubproducts"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>
                      <i className="fas fa-angle-double-right mx-3"></i>Add
                      Subproducts
                    </MenuItem>
                  </NavLink>
                </SubMenu>
                {/* ------------------------------------------------------------------------- */}
              </Menu>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
