import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import FormHeading from "../components/FormHeading";

// Api
import { editVendor, getVendor } from "../../Api/Vendor";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditVendorForm = ({ vendorInfo }) => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing a single vendor data
  const [vendorDetails, setVendorDetails] = useState({});

  const getSinlgeVendorData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      vendor_id: vendorInfo._id,
    };

    const response = await getVendor(data);
    console.log(response.data[0]);
    setVendorDetails(response.data[0]);
  };

  useEffect(() => {
    getSinlgeVendorData();
  }, []);

  // updating the edit vendor data on changing the values
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

  // on submitting the form sending the edit vendor data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    if (vendorDetails.vendor_name === "" || vendorDetails.vendor_email === "") {
      Swal.fire("Enter all Details before procedding...!");
    } else {
      setLoading(true);
      const response = await editVendor(vendorDetails);
      setLoading(false);
      console.log(response);

      if (response.status === 200) {
        Swal.fire("Good job!", "Changes made successfully!", "success");
        document.getElementById("editvendorform").reset();
        navigate("/vendors/showvendors");
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
    <form id="editvendorform">
      <div className="row">
        <FormHeading title="Edit Vendor Information" />

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
              value={vendorDetails.vendor_name}
              name="vendor_name"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>
              E-Mail
              <span className="login-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={vendorDetails.vendor_email}
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
              value={vendorDetails.vendor_phone1}
              name="vendor_phone1"
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
              value={vendorDetails.vendor_phone2}
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
              value={vendorDetails.vendor_title}
              name="vendor_title"
            />
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="form-group local-forms">
            <label>Vendor Company Name</label>
            <input
              className="form-control"
              type="text"
              onChange={insertFields}
              value={vendorDetails.vendor_company_name}
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
              value={vendorDetails.vendor_description}
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
              value={vendorDetails.vendor_street}
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
              value={vendorDetails.vendor_city}
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
              value={vendorDetails.vendor_state}
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
              value={vendorDetails.vendor_country}
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
              value={vendorDetails.vendor_code}
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
            disabled={loading}
          >
            {loading ? <>Updating..</> : <>Update</>}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditVendorForm;
