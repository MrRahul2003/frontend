import React from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import EditCompanyForm from "../editcompany/EditCompanyForm";

const EditCompany = () => {
  let location = useLocation();
  console.log("EditCompany Info: ", location.state.companyInfo);
  const companyInfo = location.state.companyInfo;

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Edit Company" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <EditCompanyForm companyInfo={companyInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
 