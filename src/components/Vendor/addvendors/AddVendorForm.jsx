import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import FormHeading from "../components/FormHeading";

// Api
import { addVendor } from "../../Api/Vendor";

// sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddVendorForm = () => {

  const MySwal = withReactContent(Swal);
  
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing the vendor data
  const [vendorDetails, setVendorDetails] = useState({
    vendor_name: "",
    vendor_email: "",
    vendor_phone1: "",
    vendor_phone2: "",
    vendor_title: "",
    vendor_company_name: "",
    vendor_description: "",

    vendor_street: "",
    vendor_city: "",
    vendor_state: "",
    vendor_country: "",
    vendor_code: "",
  });

  // updating the add vendor data on changing the values
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setVendorDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // on submitting the form sending the add vendor data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    const vendor_addingdate = new Date().toLocaleString();

    if (vendorDetails.vendor_name === "" || vendorDetails.vendor_email === "") {
      Swal.fire('Enter all Details before procedding...!')
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,

        vendor_name: vendorDetails.vendor_name,
        vendor_email: vendorDetails.vendor_email,
        vendor_phone1: vendorDetails.vendor_phone1,
        vendor_phone2: vendorDetails.vendor_phone2,
        vendor_title: vendorDetails.vendor_title,
        vendor_company_name: vendorDetails.vendor_company_name,
        vendor_description: vendorDetails.vendor_description,

        vendor_street: vendorDetails.vendor_street,
        vendor_city: vendorDetails.vendor_city,
        vendor_state: vendorDetails.vendor_state,
        vendor_country: vendorDetails.vendor_country,
        vendor_code: vendorDetails.vendor_code,
        vendor_addingdate: vendor_addingdate,
      };

      const response = await addVendor(data);
      console.log(response);

      if (response.status === 200) {
        Swal.fire(
          'Good job!',
          'New Vendor added successfully!',
          'success'
        )

        document.getElementById("addvendorform").reset();
        navigate("/vendors/showvendors");
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
      <form id="addvendorform">
        <div className="row">
          <FormHeading title="Vendor Information" />

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Vendor Name
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                required
                onChange={insertFields}
                name="vendor_name"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>E-Mail<span className="login-danger">*</span></label>
              <input
                className="form-control"
                type="text"
                onChange={insertFields}
                name="vendor_email"
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
                name="vendor_phone1"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Other Phone No
              </label>
              <input
                className="form-control"
                type="number"
                onChange={insertFields}
                name="vendor_phone2"
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
                name="vendor_title"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>Company Name</label>
              <input
                className="form-control"
                type="text"
                onChange={insertFields}
                name="vendor_company_name"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>Description</label>
              <input
                className="form-control"
                type="text"
                onChange={insertFields}
                name="vendor_description"
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
                name="vendor_street"
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
                name="vendor_city"
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
                name="vendor_state"
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
                name="vendor_country"
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
                name="vendor_code"
              />
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

export default AddVendorForm;
