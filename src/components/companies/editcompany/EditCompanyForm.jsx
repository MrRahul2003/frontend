import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import FormHeading from "../components/FormHeading";

// Api
import { editCompany, getCompany } from "../../Api/Company";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditCompanyForm = ({ companyInfo }) => {
  const MySwal = withReactContent(Swal);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing a single company data
  const [companyDetails, setCompanyDetails] = useState({});

  // ---------------------getting a single company data-----------------------------------
  const getSinlgeCompanyData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      company_id: companyInfo._id,
    };

    const response = await getCompany(data);
    console.log(response.data.companies[0]);
    setCompanyDetails(response.data.companies[0]);
  };

  useEffect(() => {
    getSinlgeCompanyData();
  }, []);
  // --------------------------------------------------------------------------------------

  // updating the edit company data on changing the values
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

  // on submitting the form sending the edit company data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    if (
      companyDetails.company_name === "" ||
      companyDetails.company_email === "" ||
      companyDetails.company_phone === ""
    ) {
      Swal.fire("Enter all Details before procedding...!");
    } else {
      const response = await editCompany(companyDetails);
      console.log(response);

      if (response.status === 200) {
        Swal.fire("Good job!", "Changes made successfully!", "success");
        document.getElementById("editcompanyform").reset();
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
      <form id="editcompanyform">
        <div className="row">
          <FormHeading title="Edit Company Information" />

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
                value={companyDetails.company_name}
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
                value={companyDetails.company_email}
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
                value={companyDetails.company_phone}
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
                value={companyDetails.company_website}
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
                value={companyDetails.company_description}
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
                value={companyDetails.company_street}
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
                value={companyDetails.company_city}
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
                value={companyDetails.company_state}
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
                value={companyDetails.company_country}
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
                value={companyDetails.company_code}
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
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditCompanyForm;
