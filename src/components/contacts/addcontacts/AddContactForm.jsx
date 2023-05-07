import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import FormHeading from "../components/FormHeading";

// Api 
import { addContact } from "../../Api/Contact";
import { getAllCompanys } from "../../Api/Company";

// sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddContactForm = () => {
  const MySwal = withReactContent(Swal);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing the contact data
  const [contactDetails, setContactDetails] = useState({
    contact_name: "",
    contact_email: "",
    contact_phone1: "",
    contact_phone2: "",
    contact_title: "",
    contact_company_id: "",
    contact_description: "",
    contact_street: "",
    contact_city: "",
    contact_state: "",
    contact_country: "",
    contact_code: "",
    contact_status: "",
  });

  // ------------getting all the compnies of login user for dropdown-------------------------
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
  }, []);
  // ---------------------------------------------------------------------------------------

  // updating the add contact data on changing the values
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

  // on submitting the form sending the add contact data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    const contact_addingdate = new Date().toLocaleString();

    if (
      contactDetails.contact_name === "" ||
      contactDetails.contact_email === "" ||
      contactDetails.contact_status === ""
    ) {
      Swal.fire('Enter all Details before procedding!')
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,

        contact_name: contactDetails.contact_name,
        contact_email: contactDetails.contact_email,
        contact_phone1: contactDetails.contact_phone1,
        contact_phone2: contactDetails.contact_phone2,
        contact_title: contactDetails.contact_title,
        contact_company_id: contactDetails.contact_company_id,
        contact_description: contactDetails.contact_description,

        contact_street: contactDetails.contact_street,
        contact_city: contactDetails.contact_city,
        contact_state: contactDetails.contact_state,
        contact_country: contactDetails.contact_country,
        contact_code: contactDetails.contact_code,
        contact_addingdate: contact_addingdate,

        contact_status: contactDetails.contact_status,
      };

      const response = await addContact(data);
      console.log(response);

      if (response.status === 200) {
        Swal.fire(
          'Good job!',
          'New Contact added successfully!',
          'success'
        )

        document.getElementById("addcontactform").reset();
        navigate("/contacts/showcontacts");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    }
  };
  return (
    <>
      <form id="addcontactform">
        <div className="row">
          <FormHeading title="Contact Information" />

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
                required
                onChange={insertFields}
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
                name="contact_phone1"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Other Phone No
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                onChange={insertFields}
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
                name="contact_title"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Company Name <span className="login-danger">*</span>
              </label>
              <select
                className="form-control select"
                onChange={insertFields}
                name="contact_company_id"
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
                name="contact_code"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <FormHeading title="Status Information" />

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Contact Status <span className="login-danger">*</span>
              </label>
              <select
                className="form-control select"
                onChange={insertFields}
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
    </>
  );
};

export default AddContactForm;
