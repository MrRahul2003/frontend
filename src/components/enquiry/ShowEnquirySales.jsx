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
  const [AllEnquiryFiltered, setAllEnquiryFiltered] = useState([]);

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

  // -----------------------------Pagination-----------------------------------------------------------
  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = AllEnquiryFiltered.slice(firstIndex, lastIndex);
  const npage = Math.ceil(AllEnquiryFiltered.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    console.log(id);
    setcurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setcurrentPage(currentPage + 1);
    }
  };
  // --------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Enquiries" />
          <Filter
            AllEnquiryFiltered={AllEnquiryFiltered}
            AllEnquiry={AllEnquiry}
            setAllEnquiryFiltered={setAllEnquiryFiltered}
          />
          {records.reverse().map((item, i) => {
            return (
              <div className="row">
                <div className="col-sm-12">
                  <div className="card card-table">
                    <div className="card-body">
                      <div className="page-header">
                        <div className="row align-items-center">
                          <div className="col">
                            <h3 className="page-title">
                              {/* Contact Id -- {item.enquiry_contact_id} */}
                            </h3>
                          </div>
                          {/* <span>Enquiry Id -- {item._id}</span> */}
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
                              <th>Enquiry</th>
                              <th>Vendor Quotation</th>
                              <th>Customer Quotataion</th>
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
                                    <NavLink
                                      to="/enquirysales/productordercustomer"
                                      className="btn btn-sm bg-success-light me-2"
                                      state={{ enquiryInfo: item }}
                                    >
                                      <i className="feather-eye" />
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
          <div>
            <ul className="pagination mb-4">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={prePage}
                >
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>

              {numbers.map((n, i) => {
                return (
                  <li
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                );
              })}

              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={nextPage}
                >
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowEnquirySales;
