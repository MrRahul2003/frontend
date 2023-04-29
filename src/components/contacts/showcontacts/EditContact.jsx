import React from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "../components/BreadCrumb";
import EditContactForm from "../editcontacts/EditContactForm";

const EditContact = () => {
  let location = useLocation();
  console.log("Contact information is: ", location.state.contactInfo);
  const contactInfo = location.state.contactInfo;
  
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <BreadCrumb title="Edit Contact" />
        <div className="row">
          <div className="col-sm-12">
            <div className="card comman-shadow">
              <div className="card-body">
                <EditContactForm contactInfo={contactInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
