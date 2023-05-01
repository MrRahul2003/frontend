import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import BreadCrumb from "./components/BreadCrumb";

// Api
import { addProduct } from "../Api/Product";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddProducts = () => {
  const MySwal = withReactContent(Swal);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing all product data in usestate
  const [productDetails, setproductDetails] = useState({
    product_name: "",
    product_desc: "",
    product_category: "",
  });

  // updating the product data as the value gets change
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setproductDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // on submitting the form sending the product data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    const product_addingdate = new Date().toLocaleString();

    if (
      productDetails.product_name === "" ||
      productDetails.product_category === ""
    ) {
      Swal.fire("Enter all Details before procedding...!");
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,

        product_name: productDetails.product_name,
        product_desc: productDetails.product_desc,
        product_category: productDetails.product_category,

        product_addingdate: product_addingdate,
      };

      const response = await addProduct(data);
      console.log(response);

      if (response.status === 200) {
        Swal.fire("Good job!", "New Product added successfully!", "success");
        document.getElementById("addProductForm").reset();
        navigate("/products/showproducts");
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
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Add New Product" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <form id="addProductForm">
                    <div className="row">
                      <div className="col-12">
                        <h5 className="form-title student-info">
                          Product Information
                        </h5>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Product name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Name here"
                            onChange={insertFields}
                            name="product_name"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                            Products Category{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control select"
                            onChange={insertFields}
                            name="product_category"
                          >
                            <option className="active" value="">
                              Select Product Category
                            </option>
                            <option value="projects">Projects</option>
                            <option value="spareparts">SpareParts</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Description</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            placeholder="Enter Description here"
                            name="product_desc"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="student-submit">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={submitForm}
                          >
                            Add Product
                          </button>
                        </div>
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

export default AddProducts;
