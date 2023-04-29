import React from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import EditVendorForm from "../editvendors/EditVendorForm";

const EditVendor = () => {
    
  let location = useLocation();
  console.log("Vendor information is: ", location.state.vendorInfo);
  const vendorInfo = location.state.vendorInfo;

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <BreadCrumb title="Edit Vendor" />
        <div className="row">
          <div className="col-sm-12">
            <div className="card comman-shadow">
              <div className="card-body">
                <EditVendorForm vendorInfo={vendorInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVendor;
