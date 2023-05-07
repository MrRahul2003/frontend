import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// api
import { getQuotation, deleteQuotation } from "../../Api/Quotation";

// components
import BreadCrumb from "../components/BreadCrumb";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ShowQuotation = () => {
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
        const response = await deleteQuotation(data);
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

  // -----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getAllQuotationData();
  }, [enquiryInfo, deleteStatus]);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Quotations" />
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
                                  Send
                                  <i className="feather-share-2 mx-2" />
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
