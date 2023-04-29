import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";

// Api
import { getAllContacts } from "../../Api/Contact";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

const Contacts = ({ companyInfo }) => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  const [allContact, setAllContact] = useState([]);

  // ---------------------getting all contacts data related to this company--------------------------------------------
  const getAllContactData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      company_id: companyInfo._id,
    };

    const response = await getAllContacts(data);
    console.log(response.data.contacts);

    const unfiltered = response.data.contacts;
    const filtered = unfiltered.filter((item) => {
      return item.contact_company_id === companyInfo._id;
    });
    setAllContact(filtered);
  };

  useEffect(() => {
    getAllContactData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------------
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
      <div className="tab-pane fade" id="contacts">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Contacts</h3>
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

                      {/* -------------------------------add contacts redirect----------------------------------------------------- */}
                      <NavLink
                        to="/contacts/addcontacts"
                        className="btn btn-primary"
                      >
                        <i className="fas fa-plus" />
                      </NavLink>
                      {/* --------------------------------------------------------------------------------------------------------- */}
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
                      </tr>
                    </thead>
                    <tbody>
                      {allContact.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i+1}</td>
                            <td>
                              <h2>
                                {/* ---------------------------------contact sections----------------------------------- */}
                                <NavLink
                                  to="/contacts/showcontacts/contactsection"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ contactInfo: item }}
                                >
                                  <a>{item.contact_name}</a>
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------- */}
                              </h2>
                            </td>
                            <td>{item.contact_email}</td>
                            <td>{item.contact_phone1}</td>
                            <td>{item.contact_phone2}</td>
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
    </>
  );
};

export default Contacts;
