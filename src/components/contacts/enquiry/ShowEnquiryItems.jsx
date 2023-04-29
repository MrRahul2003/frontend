import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import Filter from "../showcontacts/Filter";
import BreadCrumb from "../components/BreadCrumb";
import { LoginContext } from "../../context/LoginProvider";

const ShowEnquiryItems = () => {
  // ---------------------getting contact section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  const { enquiryItem, setenquiryItem, setShowItemState } =
    useContext(LoginContext);
    const loginId = localStorage.getItem("loginId");
    const email = localStorage.getItem("email");
  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in enquiryItem.itemList) {
    const obj = {
      id: i,
      item_name: enquiryItem.itemList[i].item_name,
      item_make: enquiryItem.itemList[i].item_make,
      item_modalNo: enquiryItem.itemList[i].item_modalNo,
      item_partNo: enquiryItem.itemList[i].item_partNo,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <BreadCrumb title="Show Enquiry Items" />
        <Filter />
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">{enquiryInfo.enquiry_name}</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <CSVLink
                        data={csv_file}
                        filename={"enquiryItems.csv"}
                        className="btn btn-outline-primary me-2"
                        target="_blank"
                      >
                        <i className="fas fa-download" /> Download
                      </CSVLink>
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
