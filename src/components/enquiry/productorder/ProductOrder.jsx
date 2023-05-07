import React from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import ProductOrderForm from "./ProductOrderForm";

const ProductOrder = () => {
  // ---------------------getting enquiry section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Product Order" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <ProductOrderForm enquiryInfo={enquiryInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOrder;
