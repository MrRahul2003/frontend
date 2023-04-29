import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "./components/BreadCrumb";
import FormHeading from "./components/FormHeading";

// Api
import { editEnquiry } from "../Api/Enquiry";

// context hooks
import { LoginContext } from "../context/LoginProvider";

const EditEnquirySales = () => {
  // ---------------------getting enquiry section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const EnquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  const { editenquiryInfo, display, setDisplay } =
    useContext(LoginContext);
    const loginId = localStorage.getItem("loginId");
    const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // ---------------When the page loads enquiryInfo and ItemList is updated---------------------------------------------

  const [enquiryInfo, setenquiryInfo] = useState({});

  useEffect(() => {
    setenquiryInfo({
      enquiry_stage: EnquiryInfo.enquiry_stage
    });

    

  }, []);

  // updating the edit enquiry form data on changing the values
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setenquiryInfo((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  // -----------------------------------------------------------------------------------------------

 // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    if (
      enquiryInfo.enquiry_stage === ""
    ) {
      alert("Enter the Details or add item to list");
    } else {
      const data = {
        employee_id: EnquiryInfo.employee_id,
        employee_email: EnquiryInfo.employee_email,
        enquiry_contact_id: EnquiryInfo.enquiry_contact_id,
        enquiry_contact_name: EnquiryInfo.enquiry_contact_name,

        enquiry_id: EnquiryInfo._id,
        enquiry_name: EnquiryInfo.enquiry_name,
        enquiry_closingDate: EnquiryInfo.enquiry_closingDate,
        enquiry_description: EnquiryInfo.enquiry_description,

        enquiry_stage: enquiryInfo.enquiry_stage

      };

      const response = await editEnquiry(data);
      console.log(response);

      if (response.status === 200) {
        alert("enquiry edited successfully");
        document.getElementById("editenquiryform").reset();
        navigate("/enquirysales/showenquiry");
      } else {
        alert("invalid credentials");
      }
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Edit Enquiry" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <form id="editenquiryform">
                    <div className="row">
                      <FormHeading title={enquiryInfo.enquiry_name} />

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Stage <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control select"
                            onChange={insertFields}
                            value={enquiryInfo.enquiry_stage}
                            name="enquiry_stage"
                          >
                            <option className="active" value="">
                              Chose the Stage below
                            </option>
                            <option value="Qualification">Qualification</option>
                            <option value="Get Price Quotation">
                              Get Price Quotation
                            </option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <div className="col-12">
                      <div className="student-submit">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={submitForm}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEnquirySales;
