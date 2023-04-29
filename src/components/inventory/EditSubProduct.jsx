// this page is not completed
import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

// components
import BreadCrumb from "./components/BreadCrumb";

// Api
import { getSubProduct, editSubProduct } from "../Api/SubProduct";
// context hooks
import { LoginContext } from "../context/LoginProvider";

const EditSubProduct = () => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  let location = useLocation();
  console.log("subproduct information is: ", location.state.subproductInfo);
  const subproductInfo = location.state.subproductInfo;

  // storing all product data in usestate
  const [subproductDetails, setsubproductDetails] = useState({
    subproduct_name: subproductInfo.subproduct_name,
    subproduct_modalNo: subproductInfo.subproduct_modalNo,
    subproduct_make: subproductInfo.subproduct_make,
    subproduct_desc: subproductInfo.subproduct_desc,
    subproduct_make: subproductInfo.subproduct_make,
    subproduct_partNo: subproductInfo.subproduct_partNo,
    subproduct_price: subproductInfo.subproduct_price,
    product_id: subproductInfo.product_id,
  });

  //  ---------------------fetching single subproduct from database related to login user-------------------------
  const [subproduct, setsubProduct] = useState([]);

  const getSubProductData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      product_id: subproductDetails.product_id,
      subproduct_id: subproductInfo._id,
    };

    const response = await getSubProduct(data);
    console.log(response.data);
    setsubProduct(response.data);
  };

  useEffect(() => {
    getSubProductData();
  }, []);
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

    if (
      subproductDetails.subproduct_name === "" ||
      subproductDetails.subproduct_make === "" ||
      subproductDetails.subproduct_modalNo === "" ||
      subproductDetails.subproduct_partNo === "" ||
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
        subproduct_price: subproductDetails.subproduct_price,
        subproduct_desc: subproductDetails.subproduct_desc,

        product_id: subproductDetails.product_id,
        subproduct_id: subproductInfo._id,

        subproduct_addingdate: subproductInfo.subproduct_addingdate,
        subproduct_category: subproductInfo.subproduct_category,
      };

      const response = await editSubProduct(data);
      console.log(response);

      if (response.status === 200) {
        alert("company subproduct added successfully");
        // navigate("/studentfees/showfees");
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
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <h5 className="form-title student-info">
                          SubProduct Information
                          <span>
                            <a href="javascript:;">
                              <i className="feather-more-vertical" />
                            </a>
                          </span>
                        </h5>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>SubProduct name</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            value={subproductDetails.subproduct_name}
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
                            value={subproductDetails.subproduct_make}
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
                            value={subproductDetails.subproduct_modalNo}
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
                            value={subproductDetails.subproduct_partNo}
                            name="subproduct_partNo"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>Price(Rs)</label>
                          <input
                            className="form-control"
                            type="number"
                            onChange={insertFields}
                            value={subproductDetails.subproduct_price}
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
                            value={subproductDetails.subproduct_desc}
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
                            Edit Subproduct
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

export default EditSubProduct;
