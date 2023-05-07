import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import FormHeading from "../components/FormHeading";

// Api
import { addCompany } from "../../Api/Company";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddCompanyForm = () => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing the company data
  const [companyDetails, setCompanyDetails] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_website: "",
    company_description: "",
    company_street: "",
    company_city: "",
    company_state: "",
    company_country: "",
    company_code: "",
  });

  // updating the add company data on changing the values
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCompanyDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // on submitting the form sending the add company data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    const company_addingdate = new Date().toLocaleString();

    if (
      companyDetails.company_name === "" ||
      companyDetails.company_email === "" ||
      companyDetails.company_phone === ""
    ) {
      Swal.fire("Enter all Details before procedding...!");
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,

        company_name: companyDetails.company_name,
        company_email: companyDetails.company_email,
        company_phone: companyDetails.company_phone,
        company_website: companyDetails.company_website,
        company_description: companyDetails.company_description,

        company_street: companyDetails.company_street,
        company_city: companyDetails.company_city,
        company_state: companyDetails.company_state,
        company_country: companyDetails.company_country,
        company_code: companyDetails.company_code,
        company_addingdate: company_addingdate,
      };
      setLoading(true);
      const response = await addCompany(data);
      setLoading(false);
      console.log("adding company data getting", response);

      if (response.status === 200) {
        Swal.fire("Good job!", "New Company added successfully!", "success");

        document.getElementById("addcompanyform").reset();
        navigate("/company/showcompanies");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };
  return (
    <>
      <form id="addcompanyform">
        <div className="row">
          <FormHeading title="Company Information" />

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Company Name
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                required
                onChange={insertFields}
                name="company_name"
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
                name="company_email"
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
                name="company_phone"
              />
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>Website Link</label>
              <input
                className="form-control"
                type="text"
                onChange={insertFields}
                name="company_website"
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
                name="company_description"
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
                name="company_street"
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
                name="company_city"
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
                name="company_state"
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
                name="company_country"
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
                name="company_code"
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
              disabled={loading}
            >
              {loading ? <>Adding..</> : <>Add</>}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCompanyForm;
