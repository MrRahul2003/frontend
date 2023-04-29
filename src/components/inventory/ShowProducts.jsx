import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";

// components
import BreadCrumb from "./components/BreadCrumb";
import Filter from "./components/Filter";

// Api
import { deleteProduct, getAllProduct } from "../Api/Product";
import { deleteEntireSubProduct } from "../Api/SubProduct";

// context hooks
import { LoginContext } from "../context/LoginProvider";

const ShowProducts = () => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  //  ---------------------fetching all products from database related to login user-------------------------
  const [products, setProducts] = useState([]);

  const getAllProductData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllProduct(data);
    console.log(response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    getAllProductData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------Deleting a product------------------------------------------------------------------
  const [deleteStatus, setdeleteStatus] = useState(false);

  const deleteProductData = async (productId) => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      product_id: productId,
    };

    const response = await deleteProduct(data);
    console.log(response.data);
    if (response.status === 200) {
      alert("product deleted successfully");

      const response = await deleteEntireSubProduct(data);
      console.log(response.data);
      if (response.status === 200) {
        alert("entire subproduct deleted successfully");
        setdeleteStatus(!deleteStatus);
      } else {
        alert("invalid credentials");
      }
    } else {
      alert("invalid credentials");
    }
  };
  useEffect(() => {
    getAllProductData();
  }, [deleteStatus]);
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in products) {
    const obj = {
      id: i + 1,
      product_name: products[i].product_name,
      product_category: products[i].product_category,
      product_desc: products[i].product_desc,
      product_addingdate: products[i].product_addingdate,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Show Products" />
          <Filter />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">Products</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <CSVLink
                          data={csv_file}
                          filename={"products.csv"}
                          className="btn btn-outline-primary me-2"
                          target="_blank"
                        >
                          <i className="fas fa-download" /> Download
                        </CSVLink>
                        <NavLink
                          to="/products/addproducts"
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
                          <th>Product Name</th>
                          <th>Product Category</th>
                          <th>Description</th>
                          <th>Adding Date</th>
                          <th className="text-start">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i+1}</td>
                              <td>
                                <h2>
                                  <NavLink
                                    to="/subproducts/showsubproducts"
                                    className="btn btn-sm bg-success-light me-2"
                                    state={{
                                      product_id: item._id,
                                      product_name: item.product_name,
                                    }}
                                  >
                                    {item.product_name}
                                  </NavLink>
                                </h2>
                              </td>
                              <td>{item.product_category}</td>
                              <td>{item.product_desc}</td>
                              <td>{item.product_addingdate}</td>
                              <td className="text-start">
                                  <NavLink
                                    className="btn btn-sm bg-success-light me-2"
                                    to="/subproducts/showsubproducts"
                                    state={{
                                      product_id: item._id,
                                      product_name: item.product_name,
                                    }}
                                  >
                                    <i className="feather-eye" />
                                  </NavLink>
                                  <a
                                    href="edit-subject.html"
                                    className="btn btn-sm bg-danger-light me-2"
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      deleteProductData(item._id);
                                    }}
                                  >
                                    <i className="feather-delete" />
                                  </a>
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

export default ShowProducts;
