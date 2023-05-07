import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import About from "../contactsection/About";
import AddNotes from "../contactsection/AddNotes";
import Notes from "../contactsection/Notes";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

const ContactSections = () => {
  // ---------------------getting contact section info from navlink--------------------------------
  let location = useLocation();
  console.log("Contact section information is: ", location.state.contactInfo);
  const contactInfo = location.state.contactInfo;
  // ---------------------------------------------------------------------------------------
  const { display, setDisplay } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Contact Details" />

          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  <div className="col ms-md-n2 profile-user-info">
                    <h4 className="user-name mb-0">
                      {contactInfo.contact_name}
                    </h4>
                    <h6 className="text-muted">{contactInfo.contact_email}</h6>
                  </div>
                  <div className="col-auto profile-btn">
                    {/* --------------------------------Edit Contact details------------------------------------------ */}
                    <NavLink
                      to="/contacts/editcontacts"
                      className="btn btn-sm bg-success-light me-2"
                      state={{ contactInfo: contactInfo }}
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
                      href="#shownotes"
                    >
                      Show Notes
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

                </ul>
              </div>

              <div className="tab-content profile-tab-cont">
                <About contactInfo={contactInfo} />

                <Notes contactInfo={contactInfo} />
                <AddNotes contactInfo={contactInfo} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSections;
