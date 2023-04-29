import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import BreadCrumb from "./components/BreadCrumb";

// Api
import { getAllProduct } from "../Api/Product";
import { addSubProduct } from "../Api/SubProduct";

// context hooks
import { LoginContext } from "../context/LoginProvider";

const AddSubProducts = () => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // storing all subproduct data in usestate
  const [subproductDetails, setsubproductDetails] = useState({
    subproduct_name: "",
    subproduct_make: "",
    subproduct_modalNo: "",
    subproduct_partNo: "",

    subproduct_category: "",

    subproduct_desc: "",
    subproduct_price: "",
    product_id: "",
  });

  //  ---------------------fetching all contacts from database related to login user-------------------------
  const [products, setProducts] = useState([]);
  const [unfilteredProducts, setUnfilteredProducts] = useState([]);

  const getAllProductData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllProduct(data);
    console.log(response.data);
    setUnfilteredProducts(response.data);
  };

  const filterProductsData = () => {
    const unfiltered = unfilteredProducts;
    const filtered = unfiltered.filter((item) => {
      return item.product_category === subproductDetails.subproduct_category;
    });
    setProducts(filtered);

    setsubproductDetails((preVal) => {
      return {
        ...preVal,
        product_id: "",
      };
    });
  };

  useEffect(() => {
    getAllProductData();
  }, []);

  useEffect(() => {
    filterProductsData();
  }, [subproductDetails.subproduct_category]);
  // -----------------------------------------------------------------------------------------------------------

  // updating the subproduct data as the value gets change
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setsubproductDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // on submitting the form sending the subproduct data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    const subproduct_addingdate = new Date().toLocaleString();

    if (
      subproductDetails.subproduct_name === "" ||
      subproductDetails.subproduct_make === "" ||
      subproductDetails.subproduct_modalNo === "" ||
      subproductDetails.subproduct_partNo === "" ||
      subproductDetails.subproduct_category === "" ||
      subproductDetails.subproduct_desc === "" ||
      subproductDetails.subproduct_price === "" ||
      subproductDetails.product_id === ""
    ) {
      alert("enter all fields");
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,

        subproduct_name: subproductDetails.subproduct_name,
        subproduct_make: subproductDetails.subproduct_make,
        subproduct_modalNo: subproductDetails.subproduct_modalNo,
        subproduct_partNo: subproductDetails.subproduct_partNo,
        subproduct_category: subproductDetails.subproduct_category,
        subproduct_desc: subproductDetails.subproduct_desc,
        subproduct_price: subproductDetails.subproduct_price,

        product_id: subproductDetails.product_id,
        subproduct_addingdate: subproduct_addingdate,
      };

      const response = await addSubProduct(data);
      console.log(response);

      if (response.status === 200) {
        alert("company subproduct added successfully");
        document.getElementById("addSubProductForm").reset();
        navigate("/products/showproducts");
      } else {
        alert("invalid credentials");
      }
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Add SubProduct" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <form id="addSubProductForm">
                    <div className="row">
                      <div className="col-12">
                        <h5 className="form-title student-info">
                          SubProduct Information
                        </h5>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>SubProduct name</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            name="subproduct_name"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Make</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            name="subproduct_make"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Modal No.</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            name="subproduct_modalNo"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Part No.</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            name="subproduct_partNo"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                            SubProducts Category
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control select"
                            onChange={insertFields}
                            name="subproduct_category"
                          >
                            <option className="active" value="">
                              Select SubProduct Category
                            </option>
                            <option value="projects">Projects</option>
                            <option value="spareparts">SpareParts</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                            Products <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control select"
                            onChange={insertFields}
                            name="product_id"
                          >
                            <option value="">Select Product Name</option>

                            {products.map((item, i) => {
                              return (
                                <option value={item._id} key={i}>
                                  {item.product_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Price(₹)</label>
                          <input
                            className="form-control"
                            type="number"
                            onChange={insertFields}
                            name="subproduct_price"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Description</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            name="subproduct_desc"
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
                            Add Subproduct
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

export default AddSubProducts;
