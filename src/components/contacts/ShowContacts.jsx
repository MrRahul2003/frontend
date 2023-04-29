import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";

// components
import BreadCrumb from "./components/BreadCrumb";
import Filter from "./showcontacts/Filter";

// Api
import { deleteContact, getAllContacts } from "../Api/Contact";

// Context Hooks
import { LoginContext } from "../context/LoginProvider";

const ShowContacts = () => {
  const [allContact, setAllContact] = useState([]);

  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

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

  useEffect(() => {
    getAllContactData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------Deleting a contact------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteContactDetails = async (contactId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      contact_id: contactId,
    };

    const response = await deleteContact(data);
    console.log(response.data);
    if (response.status === 200) {
      alert("contact deleted successfully");
      setdeleteStatus(!deleteStatus);
    } else {
      alert("invalid credentials");
    }
  };

  useEffect(() => {
    getAllContactData();
  }, [deleteStatus]);
  // -----------------------------------------------------------------------------------------------------------
  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in allContact) {
    const obj = {
      id: i + 1,
      contact_name: allContact[i].contact_name,
      contact_phone1: allContact[i].contact_phone1,
      contact_phone2: allContact[i].contact_phone2,
      contact_email: allContact[i].contact_email,
      contact_title: allContact[i].contact_title,
      contact_description: allContact[i].contact_description,

      contact_state: allContact[i].contact_state,
      contacteet: allContact[i].contact_street,
      contact_country: allContact[i].contact_country,
      contact_city: allContact[i].contact_city,
      contact_code: allContact[i].contact_code,
      contact_addingdate: allContact[i].contact_addingdate,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Contacts" />
          <Filter />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">All Contacts</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <CSVLink
                          data={csv_file}
                          filename={"contacts.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink>

                        {/* -
                        {/* -----------------------Adding a contact------------------------------------------------------------------ */}
                        <NavLink
                          to="/contacts/addcontacts"
                          className="btn btn-primary"
                        >
                          <i className="fas fa-plus" />
                        </NavLink>
                        {/* ----------------------------------------------------------------------------------------------------------- */}
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                      <thead className="student-thread">
                        <tr>
                          <th>ID</th>
                          <th>Contact Name</th>
                          <th>E-Mail</th>
                          <th>Phone 1</th>
                          <th>Phone 2</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Action</th>
                          <th>Enquiry</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allContact.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                <h2>
                                  {/* -----------------------Show contact section------------------------------------------------------------------ */}
                                  <NavLink
                                    to="/contacts/showcontacts/contactsection"
                                    className="btn btn-sm bg-success-light me-2"
                                    state={{ contactInfo: item }}
                                  >
                                    <a>{item.contact_name}</a>
                                  </NavLink>
                                  {/* ----------------------------------------------------------------------------------------------------------- */}
                                </h2>
                              </td>
                              <td>{item.contact_email}</td>
                              <td>{item.contact_phone1}</td>
                              <td>{item.contact_phone2}</td>
                              <td>{item.contact_title}</td>
                              <td>{item.contact_description}</td>
                              <td>{item.contact_status}</td>
                              <td className="">
                                {/* --------------------------------Showcontactdetails---------------------------------------------- */}
                                <NavLink
                                  to="/contacts/showcontacts/contactsection"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ contactInfo: item }}
                                >
                                  <i className="feather-eye" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------Editcontactdetails---------------------------------------------- */}
                                <NavLink
                                  to="/contacts/editcontacts"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ contactInfo: item }}
                                >
                                  <i className="feather-edit" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------Deletecontactdetails---------------------------------------------- */}
                                <a
                                  className="btn btn-sm bg-danger-light"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteContactDetails(item._id);
                                  }}
                                >
                                  <i className="feather-delete" />
                                </a>
                                {/* ------------------------------------------------------------------------------------------------------- */}
                              </td>
                              <td className="">
                                {/* --------------------------------Addenquirydetails---------------------------------------------- */}
                                <NavLink
                                  to="/contacts/enquiry/addenquiry"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ contactInfo: item }}
                                >
                                  <i className="fas fa-plus" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------ShowEnquirydetails---------------------------------------------- */}
                                <NavLink
                                  to="/contacts/enquiry/showenquiry"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ contactInfo: item }}
                                >
                                  <i className="feather-eye" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}
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

export default ShowContacts;
