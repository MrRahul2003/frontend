import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import About from "../contactsection/About";
import Timeline from "../contactsection/Timeline";
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
                      href="#timeline"
                    >
                      Timeline
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
                <Timeline />

                <Notes contactInfo={contactInfo} />
                <AddNotes contactInfo={contactInfo} />

                <div className="tab-pane fade" id="contacts">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Change Password</h5>
                      <div className="row">
                        <div className="col-md-10 col-lg-6">
                          <form>
                            <div className="form-group">
                              <label>Old Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                              <label>New Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                              <label>Confirm Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <button className="btn btn-primary" type="submit">
                              Save Changes
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSections;
