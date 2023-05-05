import React, { useState, useEffect, useContext } from "react";

// components
import Numbers from "./components/Numbers";
import Social from "./components/Social";

// Api
import { getPipelineEnquiry } from "../Api/Enquiry";

// Api
import { getAllCompanys } from "../Api/Company";
import { getAllContacts } from "../Api/Contact";
import { getAllVendor } from "../Api/Vendor";
import { Graph } from "./components/Graph";
import Pages from "./components/Pages";

const MainPipeline = () => {
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const userType = localStorage.getItem("userType");
  const username = localStorage.getItem("username");

  const [allCompanies, setAllCompanies] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [allVendor, setAllVendor] = useState([]);

  //  ---------------------fetching all companies from database related to login user-------------------------
  const getAllCompaniesData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllCompanys(data);
    console.log(response.data.companies);
    setAllCompanies(response.data.companies);
  };
  // -----------------------------------------------------------------------------------------------------------
  //  ---------------------fetching all contacts from database related to login user-------------------------
  const getAllContactData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllContacts(data);
    console.log(response.data.contacts);
    setAllContact(response.data.contacts);
  };
  // -----------------------------------------------------------------------------------------------------------
  //  ---------------------fetching all vendors from database related to login user-------------------------
  const getAllVendorData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllVendor(data);
    console.log(response.data);
    setAllVendor(response.data);
  };
  // -----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getAllCompaniesData();
    getAllContactData();
    getAllVendorData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Welcome {username}!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">{userType}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Numbers
          nocompanies={allCompanies.length}
          nocontacts={allContact.length}
          novendors={allVendor.length}
        />

        <Graph />

        <Pages
          companies={allCompanies}
          contacts={allContact}
          vendors={allVendor}
        />

        <Social />
      </div>

      {/* ------------------------------------------------------------------------ */}
    </div>
  );
};

export default MainPipeline;
