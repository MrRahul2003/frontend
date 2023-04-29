import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginProvider";
import { getQuotation } from "../../Api/Quotation";
import BreadCrumb from "../components/BreadCrumb";

const ShowQuotation = ({ enquiryInfo }) => {
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

  useEffect(() => {
    getAllQuotationData();
  }, [updateStatus]);
  // --------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="tab-pane fade show" id="showquotaion">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between my-3">
                  <span>Quotation Items</span>
                  <div className="col-auto profile-btn">
                    {/* --------------------------------Edit Company details------------------------------------------ */}
                    <NavLink
                      to="/enquirysales/editenquiry"
                      className="btn btn-sm bg-success-light me-2"
                      state={{ enquiryInfo: enquiryInfo }}
                    >
                      <i className="feather-edit" />
                    </NavLink>
                    {/* --------------------------------------------------------------------------------------------- */}
                  </div>
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
                      {AllQuotation.length === 0
                        ? ""
                        : AllQuotation[0].itemList?.map((item, i) => {
                            return (
                              <tr key={i} className="my-2">
                                <td>{i + 1}</td>
                                <td>{item.item_name}</td>
                                <td>{item.item_make}</td>
                                <td>{item.item_modalNo}</td>
                                <td>{item.item_partNo}</td>
                                <td>{item.item_price}</td>
                                <td>{item.item_quantity}</td>
                                <td>{item.item_total_price}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Account Status</span>
                </h5>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Quotation Closing Date
                  </p>
                  <p className="col-sm-9">{quotationInfo.quotation_closingDate}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Last Modified on
                  </p>
                  <p className="col-sm-9">{quotationInfo.lastmodifydate}</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ShowQuotation;
