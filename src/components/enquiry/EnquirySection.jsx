import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import BreadCrumb from "./components/BreadCrumb";
import About from "./enquirysection/About";

const EnquirySection = () => {
  // ---------------------getting company info section from navlink--------------------------------
  let location = useLocation();
  console.log("Company section information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Enquiry Details" />

          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  <div className="col ms-md-n2 profile-user-info">
                    <h4 className="user-name mb-0">
                      {enquiryInfo.enquiry_name}
                    </h4>
                    <h6 className="text-muted">
                      {enquiryInfo.enquiry_contact_name}
                    </h6>
                  </div>
                  <div className="col-auto profile-btn">
                    {/* --------------------------------Edit Company details------------------------------------------ */}
                    <NavLink
                      to="/enquirysales/editenquiry"
                      className="btn btn-sm bg-success-light me-2"
                      state={{ enquiryInfo: enquiryInfo }}
                    >
                      <i className="feather-edit" />
                    </NavLink>
                    {/* --------------------------------------------------------------------------------------------- */}
                  </div>
                </div>
              </div>

              <div className="profile-menu">
                <ul className="nav nav-tabs nav-tabs-solid">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#per_details_tab"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content profile-tab-cont">
                <About enquiryInfo={enquiryInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquirySection;
