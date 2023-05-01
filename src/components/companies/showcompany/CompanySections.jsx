import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import About from "../companysection/About";
import Notes from "../companysection/Notes";
import AddNotes from "../companysection/AddNotes";

const CompanySections = () => {
  // ---------------------getting company info section from navlink--------------------------------
  let location = useLocation();
  console.log("Company section information is: ", location.state.companyInfo);
  const companyInfo = location.state.companyInfo;
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Company Details" />

          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  <div className="col ms-md-n2 profile-user-info">
                    <h4 className="user-name mb-0">
                      {companyInfo.company_name}
                    </h4>
                    <h6 className="text-muted">{companyInfo.company_email}</h6>
                  </div>
                  <div className="col-auto profile-btn">
                    {/* --------------------------------Edit Company details------------------------------------------ */}
                    <NavLink
                      to="/company/editcompany"
                      className="btn btn-sm bg-success-light me-2"
                      state={{ companyInfo: companyInfo }}
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
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#addnotes"
                    >
                      Add Notes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#shownotes"
                    >
                      Show Notes
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content profile-tab-cont">
                <About companyInfo={companyInfo} />

                <Notes companyInfo={companyInfo} />
                <AddNotes companyInfo={companyInfo} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySections;
