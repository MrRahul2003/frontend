import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import About from "../vendorsection/About";
import Timeline from "../vendorsection/Timeline";

const VendorSections = () => {
  // ---------------------getting vendor info section from navlink--------------------------------
  let location = useLocation();
  console.log("vendor section information is: ", location.state.vendorInfo);
  const vendorInfo = location.state.vendorInfo;
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Vendor Details" />

          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  <div className="col ms-md-n2 profile-user-info">
                    <h4 className="user-name mb-0">
                      {vendorInfo.vendor_name}
                    </h4>
                    <h6 className="text-muted">{vendorInfo.vendor_email}</h6>
                  </div>
                  <div className="col-auto profile-btn">
                    {/* --------------------------------Edit Vendor details------------------------------------------ */}
                    <NavLink
                      to="/vendors/editvendors"
                      className="btn btn-sm bg-success-light me-2"
                      state={{ vendorInfo: vendorInfo }}
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
                      href="#timeline"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content profile-tab-cont">
                <About vendorInfo={vendorInfo} />

                <Timeline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default VendorSections;
