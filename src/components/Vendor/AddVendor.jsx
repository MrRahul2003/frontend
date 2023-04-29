import React from "react";

// components
import BreadCrumb from "./components/BreadCrumb";
import AddVendorForm from "./addvendors/AddVendorForm";

const AddVendor = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Add Vendor" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <AddVendorForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddVendor