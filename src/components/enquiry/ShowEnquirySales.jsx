import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// components
import BreadCrumb from "./components/BreadCrumb";
import Filter from "./components/Filter";

// api
import { getPipelineEnquiry } from "../Api/Enquiry";

const ShowEnquirySales = () => {
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const [AllEnquiry, setAllEnquiry] = useState([]);

  // --------------get all contact enquiry and storing them in single array-------------------------------
  const getAllEnquiryData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getPipelineEnquiry(data);
    console.log("all enquiry pipeline", response.data);
    setAllEnquiry(response.data);
  };

  useEffect(() => {
    getAllEnquiryData();
  }, []);
  // --------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Enquiries" />
          <Filter />
          {AllEnquiry.map((item, i) => {
            return (
              <div className="row">
                <div className="col-sm-12">
                  <div className="card card-table">
                    <div className="card-body">
                      <div className="page-header">
                        <div className="row align-items-center">
                          <div className="col">
                            <h3 className="page-title">
                              Contact Id -- {item.enquiry_contact_id}
                            </h3>
                          </div>
                          <span>Enquiry Id -- {item._id}</span>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                          <thead className="student-thread">
                            <tr>
                              <th>ID</th>
                              <th>Enquiry Name</th>
                              <th>Stage</th>
                              <th>Contact Name</th>
                              <th>Closing Date</th>
                              <th>Adding Date</th>
                              <th>Action</th>
                              <th>Quotation</th>
                              <th>Order</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.enquiry.map((item, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>
                                    <h2>
                                      <NavLink
                                        to="/enquirysales/enquirysection"
                                        className="btn btn-sm bg-success-light me-2"
                                        state={{ enquiryInfo: item }}
                                      >
                                        {item.enquiry_name}
                                      </NavLink>
                                    </h2>
                                  </td>
                                  <td>{item.enquiry_stage}</td>
                                  <td>{item.enquiry_contact_name}</td>
                                  <td>{item.enquiry_closingDate}</td>
                                  <td>{item.enquiry_addingdate}</td>

                                  <td className="">
                                    <NavLink
                                      to="/enquirysales/enquirysection"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-eye" />
                                    </NavLink>
                                    <NavLink
                                      to="/enquirysales/editenquiry"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-edit" />
                                    </NavLink>
                                    <NavLink
                                      to="/enquirysales/showvendorssales"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-share-2" />
                                    </NavLink>
                                  </td>

                                  <td className="">
                                    <NavLink
                                      to="/enquirysales/addquotation"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-plus" />
                                    </NavLink>
                                    <NavLink
                                      to="/enquirysales/showquotation"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-eye" />
                                    </NavLink>
                                  </td>

                                  <td className="">
                                    <NavLink
                                      to="/enquirysales/productorder"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-share" />
                                    </NavLink>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShowEnquirySales;
