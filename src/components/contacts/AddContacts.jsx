import React from "react";

// components
import BreadCrumb from "./components/BreadCrumb";
import AddContactForm from "./addcontacts/AddContactForm";

const AddContacts = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Add New Contact" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <AddContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default AddContacts;
