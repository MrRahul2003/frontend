import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import { LoginContext } from "../../context/LoginProvider";
import { getQuotation } from "../../Api/Quotation";
import BreadCrumb from "../components/BreadCrumb";
import { deleteQuotation } from "../../Api/Quotation";
import { useNavigate } from "react-router-dom";

const ShowQuotation = () => {
  // ---------------------getting enquiry section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  // const { email, loginId } = useContext(LoginContext);
  const [AllQuotation, setAllQuotation] = useState([]);
  const { updateStatus, setUpdateStatus } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  // --------------get all contact quotation and storing them in single array-------------------------------

  const getAllQuotationData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      enquiry_id: enquiryInfo._id,
    };

    const response = await getQuotation(data);
    console.log("all quotation", response.data);
    setAllQuotation(response.data);
  };

  // --------------------------------------------------------------------------------------------------
  // -----------------------Deleting a contact------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteQuotationData = async (quotationInfo) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      quotation_id: quotationInfo._id,
    };

    const response = await deleteQuotation(data);
    console.log(response.data);
    if (response.status === 200) {
      alert("contact deleted successfully");
      setdeleteStatus(!deleteStatus);
    } else {
      alert("invalid credentials");
    }
  };

  // -----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getAllQuotationData();
  }, [enquiryInfo, deleteStatus]);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Quotations" />
          {/* <Filter /> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        {/* <CSVLink
                          data={csv_file}
                          filename={"enquiries.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink> */}
                      </div>
                    </div>
                  </div>

                  {AllQuotation &&
                    AllQuotation.map((item, i) => {
                      return (
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Quotation - {i + 1}</span>
                              <span>
                                <NavLink
                                  to="/enquirysales/purchaseorder"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{
                                    quotationInfo: item,
                                    enquiryInfo: enquiryInfo,
                                  }}
                                >
                                  <i className="feather-share" />
                                </NavLink>

                                <NavLink
                                  to="/enquirysales/editquotation"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{
                                    quotationInfo: item,
                                    enquiryInfo: enquiryInfo,
                                  }}
                                >
                                  <i className="feather-edit" />
                                </NavLink>
                                <a
                                  className="btn btn-sm bg-danger-light"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteQuotationData(item);
                                  }}
                                >
                                  <i className="feather-delete" />
                                </a>
                              </span>
                            </h5>
                            <div className="row">
                              <p className="col-sm-9">
                                Enquiry Id - {item.enquiry_id}
                              </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-9">
                                Vendor Id - {item.vendor_id}
                              </p>
                            </div>
                          </div>

                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Quotation Items</span>
                            </h5>
                            <div className="table-responsive">
                              <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                                <thead className="student-thread">
                                  <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Make</th>
                                    <th>Modal No</th>
                                    <th>Part No</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.itemList.map((subitem, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{subitem.item_name}</td>
                                        <td>{subitem.item_make}</td>
                                        <td>{subitem.item_modalNo}</td>
                                        <td>{subitem.item_partNo}</td>
                                        <td>{subitem.item_price}</td>
                                        <td>{subitem.item_quantity}</td>
                                        <td>{subitem.item_total_price}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowQuotation;
