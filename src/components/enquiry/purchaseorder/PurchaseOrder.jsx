import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../components/BreadCrumb";
import PurchaseOrderForm from "./PurchaseOrderForm";

const PurchaseOrder = () => { 
  // ---------------------getting enquiry section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.quotationInfo);
  const quotationInfo = location.state.quotationInfo;
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Purchase Order" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <PurchaseOrderForm
                    quotationInfo={quotationInfo}
                    enquiryInfo={enquiryInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrder;
