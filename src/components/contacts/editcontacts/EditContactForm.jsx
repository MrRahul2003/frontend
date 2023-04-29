import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { editContact, getContact } from "../../Api/Contact";
import { getAllCompanys } from "../../Api/Company";

// Context Hooks
import { LoginContext } from "../../context/LoginProvider";
import FormHeading from "../components/FormHeading";

const EditContactForm = ({ contactInfo }) => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing a single contact data
  const [contactDetails, setContactDetails] = useState({});

  const getSinlgeContactData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      contact_id: contactInfo._id,
    };

    const response = await getContact(data);
    console.log(response.data);
    setContactDetails(response.data.contacts[0]);
  };

  // --------------------getting all the compnies of login user for dropdown-------------------------
  const [allCompanies, setAllCompanies] = useState([]);

  const getAllCompaniesData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllCompanys(data);
    console.log(response.data.companies);
    setAllCompanies(response.data.companies);
  };

  useEffect(() => {
    getAllCompaniesData();
    getSinlgeContactData();
  }, []);
  // -----------------------------------------------------------------------------------

  // updating the edit contact data on changing the values
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // on submitting the form sending the edit contact data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    if (
      contactDetails.contact_name === "" ||
      contactDetails.contact_email === "" ||
      contactDetails.contact_status === ""
    ) {
      alert("Enter the Details before procedding");
    } else {
      const response = await editContact(contactDetails);
      console.log(response);

      if (response.status === 200) {
        alert("contact editted successfully");
        document.getElementById("editcontactform").reset();
        navigate("/contacts/showcontacts");
      } else {
        alert("invalid credentials");
      }
    }
  };
  return (
    <form id="editcontactform">
      <div className="row">
        <FormHeading title="Edit Contact Information" />

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>
              Contact Name
              <span className="login-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              required
              onChange={insertFields}
              value={contactDetails.contact_name}
              name="contact_name"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>E-Mail</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_email}
              name="contact_email"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Phone</label>
            <input
              className="form-control"
              type="number"
              onChange={insertFields}
              value={contactDetails.contact_phone1}
              name="contact_phone1"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Other Phone No</label>
            <input
              className="form-control"
              type="number"
              onChange={insertFields}
              value={contactDetails.contact_phone2}
              name="contact_phone2"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_title}
              name="contact_title"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Contact Company Name</label>
            <select
              className="form-control select"
              onChange={insertFields}
              value={contactDetails.company_name}
              name="contact_contact_id"
            >
              <option value="">Select Company Name</option>

              {allCompanies.map((item, i) => {
                return (
                  <option value={item._id} key={i}>
                    {item.company_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_description}
              name="contact_description"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <FormHeading title="Address Information" />

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Street</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_street}
              name="contact_street"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>City</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_city}
              name="contact_city"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>State</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_state}
              name="contact_state"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Country</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={contactDetails.contact_country}
              name="contact_country"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Code </label>
            <input
              className="form-control"
              type="number"
              onChange={insertFields}
              value={contactDetails.contact_code}
              name="contact_code"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <FormHeading title="Address Information" />

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>
              Contact Status <span className="login-danger">*</span>
            </label>
            <select
              className="form-control select"
              onChange={insertFields}
              value={contactDetails.contact_status}
              name="contact_status"
            >
              <option value="" className="active">Select Status</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
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
  );
};

export default EditContactForm;
