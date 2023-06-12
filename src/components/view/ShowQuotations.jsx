import React, { useEffect, useState } from "react";

// api
import { getAllQuotation } from "../Api/Quotation";

// components
import BreadCrumb from "./components/BreadCrumb";
import FilterQuotation from "./components/FilterQuotation";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ShowQuotations = () => {
  const MySwal = withReactContent(Swal);

  const [AllQuotation, setAllQuotation] = useState([]);
  const [AllQuotationFilter, setAllQuotationFilter] = useState([]);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  // --------------get all contact quotation and storing them in single array-------------------------------

  const getAllQuotationData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllQuotation(data);
    console.log("all quotation", response.data);
    setAllQuotation(response.data);
  };

  // --------------------------------------------------------------------------------------------------

  useEffect(() => {
    getAllQuotationData();
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Quotations" />
          <FilterQuotation 
          AllQuotation={AllQuotation}
          setAllQuotationFilter={setAllQuotationFilter}
          />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  {AllQuotationFilter &&
                    AllQuotationFilter.reverse().map((item, i) => {
                      return (
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Quotation - {i + 1}</span>
                            </h5>
                            <div className="row">
                              <p className="col-sm-9">Enquiry Id - {item.enquiry_id}</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-9">Vendor Id - {item.vendor_id}</p>
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
                                        <td>{subitem.item_IGST}</td>
                                        <td>{subitem.item_CGST}</td>
                                        <td>{subitem.item_SGST}</td>
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

export default ShowQuotations;
