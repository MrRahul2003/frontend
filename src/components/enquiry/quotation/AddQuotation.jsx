import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import AddQuotationForm from "./AddQuotationForm";

const AddQuotation = () => {
    // ---------------------getting enquiry section info from navlink--------------------------------
    let location = useLocation();
    console.log("Enquiry information is: ", location.state.enquiryInfo);
    const enquiryInfo = location.state.enquiryInfo;
    // ---------------------------------------------------------------------------------------
  
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Add Quotaion" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <AddQuotationForm enquiryInfo={enquiryInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default AddQuotation;
