import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";

// components
import BreadCrumb from "./components/BreadCrumb";
import Filter from "./components/Filter";

// Api
import { getAllVendor, deleteVendor } from "../Api/Vendor";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ShowVendor = () => {
  const MySwal = withReactContent(Swal);

  const [allVendor, setAllVendor] = useState([]);
  const [allVendorFiltered, setAllVendorFiltered] = useState([]);

  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

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

  useEffect(() => {
    getAllVendorData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------Deleting a vendor------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteVendorDetails = async (vendorId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      vendor_id: vendorId,
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
        const response = await deleteVendor(data);
        console.log(response.data);

        if (response.status === 200) {
          Swal.fire("Deleted!", "Your Company has been deleted.", "success");
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
    getAllVendorData();
  }, [deleteStatus]);
  // -----------------------------------------------------------------------------------------------------------
  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in allVendor) {
    const obj = {
      id: i + 1,
      vendor_name: allVendor[i].vendor_name,
      vendor_phone1: allVendor[i].vendor_phone1,
      vendor_phone2: allVendor[i].vendor_phone2,
      vendor_email: allVendor[i].vendor_email,
      vendor_title: allVendor[i].vendor_title,
      vendor_description: allVendor[i].vendor_description,

      vendor_state: allVendor[i].vendor_state,
      vendor_street: allVendor[i].vendor_street,
      vendor_country: allVendor[i].vendor_country,
      vendor_city: allVendor[i].vendor_city,
      vendor_code: allVendor[i].vendor_code,
      vendor_addingdate: allVendor[i].vendor_addingdate,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Vendors" />
          <Filter
            setAllVendorFiltered={setAllVendorFiltered}
            allVendor={allVendor}
            allVendorFiltered={allVendorFiltered}
          />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">All Vendors</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <CSVLink
                          data={csv_file}
                          filename={"vendors.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink>
                        {/* -----------------------Adding a vendor------------------------------------------------------------------ */}
                        <NavLink
                          to="/vendors/addvendors"
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
                          <th>Vendor Name</th>
                          <th>E-Mail</th>
                          <th>Phone 1</th>
                          <th>Phone 2</th>
                          <th>Title</th>
                          <th>Company Name</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVendorFiltered.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                <h2>
                                  {/* -----------------------Show vendor section------------------------------------------------------------------ */}
                                  <NavLink
                                    to="/vendors/showvendors/vendorsection"
                                    className="btn btn-sm bg-success-light me-2"
                                    state={{ vendorInfo: item }}
                                  >
                                    <a>{item.vendor_name}</a>
                                  </NavLink>
                                  {/* ----------------------------------------------------------------------------------------------------------- */}
                                </h2>
                              </td>
                              <td>{item.vendor_email}</td>
                              <td>{item.vendor_phone1}</td>
                              <td>{item.vendor_phone2}</td>
                              <td>{item.vendor_title}</td>
                              <td>{item.vendor_company_name}</td>
                              <td>{item.vendor_description}</td>
                              <td className="text-start">
                                {/* --------------------------------Showvendordetails---------------------------------------------- */}
                                <NavLink
                                  to="/vendors/showvendors/vendorsection"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ vendorInfo: item }}
                                >
                                  <i className="feather-eye" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------Editvendordetails---------------------------------------------- */}
                                <NavLink
                                  to="/vendors/editvendors"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{ vendorInfo: item }}
                                >
                                  <i className="feather-edit" />
                                </NavLink>
                                {/* ------------------------------------------------------------------------------------------------------- */}

                                {/* --------------------------------Deletevendordetails---------------------------------------------- */}
                                <a
                                  className="btn btn-sm bg-danger-light"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteVendorDetails(item._id);
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

export default ShowVendor;
