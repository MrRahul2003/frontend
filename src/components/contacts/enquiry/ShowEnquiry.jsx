import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";

import BreadCrumb from "../components/BreadCrumb";
import Filter from "../showcontacts/Filter";

// Api
import { deleteEnquiry, getAllEnquiry } from "../../Api/Enquiry";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ShowEnquiry = () => {

  const MySwal = withReactContent(Swal);

  // ---------------------getting contact section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.contactInfo);
  const contactInfo = location.state.contactInfo;
  // ---------------------------------------------------------------------------------------

  const { display } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  // --------------get all enquiries related to this contact----------------------------------------
  const [allEnquiry, setAllEnquiry] = useState([]);
  const getAllEnquiryData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      enquiry_contact_id: contactInfo._id,
    };

    const response = await getAllEnquiry(data);
    console.log("all enquiry data", response.data.enquiry);
    setAllEnquiry(response.data.enquiry);
  };

  useEffect(() => {
    getAllEnquiryData();
  }, []);
  // --------------------------------------------------------------------------------------------------

  // -----------------------Deleting a enquiry------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteEnquiryDetails = async (enquiryId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      enquiry_contact_id: contactInfo._id,
      enquiry_id: enquiryId,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteEnquiry(data);
        console.log(response.data);

        if (response.status === 200) {
          Swal.fire("Deleted!", "Your Enquiry has been deleted.", "success");
          setdeleteStatus(!deleteStatus);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  useEffect(() => {
    getAllEnquiryData();
  }, [deleteStatus, display]);
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in allEnquiry) {
    const obj = {
      id: i,
      enquiry_name: allEnquiry[i].enquiry_name,
      enquiry_stage: allEnquiry[i].enquiry_stage,
      enquiry_contact_name: allEnquiry[i].enquiry_contact_name,
      enquiry_description: allEnquiry[i].enquiry_description,
      NoofItems: allEnquiry[i].itemList.length,
      enquiry_closingDate: allEnquiry[i].enquiry_closingDate,
      enquiry_addingdate: allEnquiry[i].enquiry_addingdate,
    };
    csv_file.push(obj);
  }
  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Enquiries" />
          <Filter />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">All Enquiries</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <CSVLink
                          data={csv_file}
                          filename={"enquiries.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink>
                      </div>
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
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allEnquiry.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                <h2>
                                  <NavLink
                                    to="/contacts/enquiry/showenquiryitems"
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
                              <td>{item.enquiry_description}</td>
                              <td className="">
                                <NavLink
                                  to="/contacts/enquiry/showenquiryitems"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ enquiryInfo: item }}
                                >
                                  <i className="fa fa-eye" />
                                </NavLink>

                                <NavLink
                                  to="/contacts/enquiry/editenquiry"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{
                                    enquiryInfo: item,
                                    contactInfo: contactInfo,
                                  }}
                                >
                                  <i className="fa fa-edit" />
                                </NavLink>

                                <a
                                  className="btn btn-sm bg-danger-light"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteEnquiryDetails(item._id);
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </a>
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
        </div>
      </div>
    </>
  );
};

export default ShowEnquiry;
