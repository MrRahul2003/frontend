import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
 
// components
import BreadCrumb from "./components/BreadCrumb";
import Filter from "./showcompany/Filter";

// Api
import { deleteCompany, getAllCompanys } from "../Api/Company";

// Context Hooks
import { LoginContext } from "../context/LoginProvider";

const ShowCompanies = () => {
  const [allCompanies, setAllCompanies] = useState([]);

  const { email, loginId } = useContext(LoginContext);

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

  useEffect(() => {
    getAllCompaniesData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------Deleting a company------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteCompanyDetails = async (companyId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      company_id: companyId,
    };

    const response = await deleteCompany(data);
    console.log(response.data);
    if (response.status === 200) {
      alert("Company deleted successfully");
      setdeleteStatus(!deleteStatus);
    } else {
      alert("invalid credentials");
    }
  };

  useEffect(() => {
    getAllCompaniesData();
  }, [deleteStatus]);
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------csv data---------------------------------------------------------------------------
  const csv_file = [];

  for (const i in allCompanies) {
    const obj = {
      id: i + 1,
      company_name: allCompanies[i].company_name,
      company_phone: allCompanies[i].company_phone,
      company_email: allCompanies[i].company_email,
      company_website: allCompanies[i].company_website,
      company_description: allCompanies[i].company_description,

      company_state: allCompanies[i].company_state,
      company_street: allCompanies[i].company_street,
      company_country: allCompanies[i].company_country,
      company_city: allCompanies[i].company_city,
      company_code: allCompanies[i].company_code,
      company_addingdate: allCompanies[i].company_addingdate,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Companies" />
          <Filter />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">All Companies</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <CSVLink
                          data={csv_file}
                          filename={"companies.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink>
                        {/* -----------------------Adding a company------------------------------------------------------------------ */}
                        <NavLink
                          to="/company/addcompany"
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
                          <th>Company Name</th>
                          <th>E-Mail</th>
                          <th>Phone</th>
                          <th>Website Link</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCompanies.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                <h2>
                                  {/* -----------------------Show company section------------------------------------------------------------------ */}

                                  <NavLink
                                    to="/company/showcompanies/companysection"
                                    className="btn btn-sm bg-success-light me-2"
                                    state={{ companyInfo: item }}
                                  >
                                    <a>{item.company_name}</a>
                                  </NavLink>
                                  {/* ----------------------------------------------------------------------------------------------------------- */}
                                </h2>
                              </td>
                              <td>{item.company_email}</td>
                              <td>{item.company_phone}</td>
                              <td>{item.company_website}</td>
                              <td>{item.company_description}</td>
                              <td className="text-start">
                                {/* --------------------------------Showcompanydetails---------------------------------------------- */}
                                <NavLink
                                  to="/company/showcompanies/companysection"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ companyInfo: item }}
                                >
                                  <i className="feather-eye" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------Editcompanydetails----------------------------------------------------- */}
                                <NavLink
                                  to="/company/editcompany"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ companyInfo: item }}
                                >
                                  <i className="feather-edit" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------Deletecompanydetails-------------------------------------------------- */}
                                <a
                                  className="btn btn-sm bg-danger-light"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteCompanyDetails(item._id);
                                  }}
                                >
                                  <i className="feather-delete" />
                                </a>
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

export default ShowCompanies;
