import React, { useState, useEffect, useContext } from "react";

// components
import Numbers from "./components/Numbers";

// Api
import { getPipelineEnquiry } from "../Api/Enquiry";

// Api
import { getAllCompanys } from "../Api/Company";
import { getAllContacts } from "../Api/Contact";
import { getAllVendor } from "../Api/Vendor";

const MainPipeline = () => {
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  const [AllEnquiry, setAllEnquiry] = useState([]);
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
                <h3 className="page-title">Welcome {email}!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Admin</li>
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

        <div className="row">
          <div className="col-xl-12 d-flex">
            <div className="card flex-fill student-space comman-shadow">
              <div className="card-header d-flex align-items-center">
                <h5 className="card-title">All Enquiries</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Enquiry Name</th>
                        <th>Stage</th>
                        <th>Enquiry Item</th>
                        <th>Contact Name</th>
                        <th>Closing Date</th>
                        <th>Adding Date</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------ */}

        <div className="row">
          <div className="col-12 col-lg-12 col-xl-8">
            {/* <!-- aisha 4 graph ma sara companies contacts ka data ayaga --> */}
            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12 d-flex">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h5 className="card-title">Increment No</h5>
                      </div>
                      <div className="col-6">
                        <ul className="chart-list-out">
                          <li>
                            <span className="circle-blue" />
                            Teacher
                          </li>
                          <li>
                            <span className="circle-green" />
                            Students
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="school-area" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-12 col-xl-4 d-flex">
            <div className="card flex-fill comman-shadow">
              <div className="card-body">
                <div className="calendar-info calendar-info1">
                  <div className="up-come-header">
                    <h2>Companies</h2>
                  </div>

                  {allCompanies.map((item, i) => {
                    return (
                      <>
                        <div className="calendar-details">
                          <div className="calendar-box normal-bg">
                            <div className="calandar-event-name">
                              <h4>{item.company_name}</h4>
                              <h5>{item.company_email}</h5>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="calendar-info calendar-info1">
                  <div className="up-come-header">
                    <h2>Contacts</h2>
                  </div>

                  {allContact.map((item, i) => {
                    return (
                      <>
                        <div className="calendar-details">
                          <div className="calendar-box normal-bg">
                            <div className="calandar-event-name">
                              <h4>{item.contact_name}</h4>
                              <h5>{item.contact_email}</h5>
                            </div>
                            <span>{item.contact_status}</span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="calendar-info calendar-info1">
                  <div className="up-come-header">
                    <h2>Vendors</h2>
                  </div>

                  {allVendor.map((item, i) => {
                    return (
                      <>
                        <div className="calendar-details">
                          <div className="calendar-box normal-bg">
                            <div className="calandar-event-name">
                              <h4>{item.vendor_name}</h4>
                              <h5>{item.vendor_email}</h5>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------ */}
      </div>
    </div>
  );
};

export default MainPipeline;
