import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// api
import { getProductOrder } from "../../Api/ProductOrder";

// components
import BreadCrumb from "../components/BreadCrumb";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ProductOrderCustomer = () => {
  const MySwal = withReactContent(Swal);

  // ---------------------getting enquiry section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  const [AllQuotation, setAllQuotation] = useState([]);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  // --------------get all contact quotation and storing them in single array-------------------------------

  const getQuotationData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      enquiry_id: enquiryInfo._id,
    };

    const response = await getProductOrder(data);
    console.log("all getproductorder", response.data);
    setAllQuotation(response.data);
  };

  useEffect(() => {
    getQuotationData();
  }, [enquiryInfo]);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Customer Quotations" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  {AllQuotation &&
                    AllQuotation.map((item, i) => {
                      return (
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Customer Quotation - {i + 1}</span>
                              <span>

                                {/* <NavLink
                                  to="/enquirysales/editquotationcustomer"
                                  className="btn btn-sm bg-success-light me-2"
                                  state={{
                                    quotationInfo: item,
                                    enquiryInfo: enquiryInfo,
                                  }}
                                >
                                  <i className="feather-edit" />
                                </NavLink> */}

                              </span>
                            </h5>
                            <div className="row">
                              <p className="col-sm-9">
                                ref No - {item.uuid_id}
                              </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-9">
                                Sending Date - {item.productorder_addingdate}
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
                                    <th>Make</th>
                                    <th>Modal No</th>
                                    <th>Part Name</th>
                                    <th>Part No</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>IGST</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>Total Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.itemList.map((subitem, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{subitem.item_make}</td>
                                        <td>{subitem.item_modalNo}</td>
                                        <td>{subitem.item_name}</td>
                                        <td>{subitem.item_partNo}</td>
                                        <td>{subitem.item_price}</td>
                                        <td>{subitem.item_quantity}</td>
                                        <td>
                                          {subitem.item_IGST
                                            ? subitem.item_IGST
                                            : 0}
                                        </td>
                                        <td>
                                          {subitem.item_CGST
                                            ? subitem.item_CGST
                                            : 0}
                                        </td>
                                        <td>
                                          {subitem.item_SGST
                                            ? subitem.item_SGST
                                            : 0}
                                        </td>
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

export default ProductOrderCustomer;
