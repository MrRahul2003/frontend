import React from "react";

// components
import BreadCrumb from "./components/BreadCrumb";
import AddCompanyForm from "./addcompany/AddCompanyForm";

const AddCompany = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Add Company" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <AddCompanyForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCompany;
