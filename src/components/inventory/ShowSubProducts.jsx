import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";

// components
import BreadCrumb from "./components/BreadCrumb";
import Filter from "./components/Filter";

// Api
import { deleteSubProduct, getAllSubProduct } from "../Api/SubProduct";

// context hooks
import { LoginContext } from "../context/LoginProvider";

const ShowSubProducts = () => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  let location = useLocation();

  console.log(
    "Show Subproducts Id: ",
    location.state.product_id,
    location.state.product_name
  );
  const product_id = location.state.product_id;
  const product_name = location.state.product_name;

  //  ---------------------fetching all subproducts from database related to login user-------------------------

  const [subproducts, setSubproducts] = useState([]);

  const getAllSubProductData = async (productId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      product_id: product_id,
    };

    const response = await getAllSubProduct(data);
    console.log(response.data.subproduct);
    setSubproducts(response.data.subproduct);
  };
  useEffect(() => {
    getAllSubProductData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------Deleting a Subproduct------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteSubProductData = async (subproductId, productId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      product_id: productId,
      subproduct_id: subproductId,
    };

    const response = await deleteSubProduct(data);
    console.log(response.data);
    if (response.status === 200) {
      alert("subproduct deleted successfully");
      setdeleteStatus(!deleteStatus);
    } else {
      alert("invalid credentials");
    }
  };

  useEffect(() => {
    getAllSubProductData();
  }, [deleteStatus]);
  // -----------------------------------------------------------------------------------------------------------
  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in subproducts) {
    const obj = {
      id: i + 1,
      subproduct_name: subproducts[i].subproduct_name,
      subproduct_make: subproducts[i].subproduct_make,
      subproduct_partNo: subproducts[i].subproduct_partNo,
      subproduct_modalNo: subproducts[i].subproduct_modalNo,
      subproduct_price: subproducts[i].subproduct_price,
      subproduct_desc: subproducts[i].subproduct_desc,
      subproduct_category: subproducts[i].subproduct_category,
      subproduct_addingdate: subproducts[i].subproduct_addingdate,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Subproducts" />
          <Filter />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">{product_name}</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <CSVLink
                          data={csv_file}
                          filename={"subproducts.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink>
                        <NavLink
                          to="/subproducts/addsubproducts"
                          className="btn btn-primary"
                        >
                          <i className="fas fa-plus" />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                      <thead className="student-thread">
                        <tr>
                          <th>ID</th>
                          <th>SubProduct Name</th>
                          <th>Make</th>
                          <th>Modal No.</th>
                          <th>Part No.</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Adding Date</th>
                          <th className="text-start">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subproducts.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                <h2>
                                  <a>{item.subproduct_name}</a>
                                </h2>
                              </td>
                              <td>{item.subproduct_make}</td>
                              <td>{item.subproduct_modalNo}</td>
                              <td>{item.subproduct_partNo}</td>
                              <td>{item.subproduct_category}</td>
                              <td>{item.subproduct_price}</td>
                              <td>{item.subproduct_desc}</td>
                              <td>{item.subproduct_addingdate}</td>
                              <td className="text-end">
                                <a
                                  href=""
                                  className="btn btn-sm bg-success-light me-2"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteSubProductData(
                                      item._id,
                                      item.product_id
                                    );
                                  }}
                                >
                                  <i className="feather-delete" />
                                </a>

                                <NavLink
                                  className="btn btn-sm bg-danger-light"
                                  to="/subproducts/editsubproduct"
                                  state={{
                                    subproductInfo: item,
                                  }}
                                >
                                  <i className="feather-edit" />
                                </NavLink>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSubProducts;
