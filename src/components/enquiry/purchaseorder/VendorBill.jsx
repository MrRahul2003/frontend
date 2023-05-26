import React from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import VendorBillForm from "./VendorBillForm";

const VendorBill = () => {
  // ---------------------getting quotation and enquiry section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.quotationInfo);
  const quotationInfo = location.state.quotationInfo;
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Purchase Vendor Bill" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <VendorBillForm
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
}

export default VendorBill