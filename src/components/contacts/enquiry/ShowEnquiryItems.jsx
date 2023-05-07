import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";

const ShowEnquiryItems = () => {
  // ---------------------getting contact section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ----------------------------------------------------------------------------------------

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <BreadCrumb title="Show Enquiry Items" />
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">{enquiryInfo.enquiry_name}</h3>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Make</th>
                        <th>Modal No</th>
                        <th>Part No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiryInfo.itemList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.item_name}</td>
                            <td>{item.item_make}</td>
                            <td>{item.item_modalNo}</td>
                            <td>{item.item_partNo}</td>
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
  );
};

export default ShowEnquiryItems;
