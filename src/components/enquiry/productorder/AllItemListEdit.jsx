import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AllItemListEdit = (props) => {
  const deleteItem = (id) => {
    props.deleteItem(id);
  };

  const [AllItemsData, setAllItemsData] = useState([]);

  useEffect(() => {
    setAllItemsData(props.ItemList);
  }, [props.ItemList]);

  return (
    <div className="content container-fluid mt-4">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Items</h3>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                  <thead className="student-thread">
                    <tr>
                      <th>ID</th>
                      <th>Make</th>
                      <th>Modal No</th>
                      <th>Part Name</th>
                      <th>Part No</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>IGST</th>
                      <th>CGST</th>
                      <th>SGST</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllItemsData &&
                      AllItemsData.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.item_make}</td>
                            <td>{item.item_modalNo}</td>
                            <td>
                              <h2>{item.item_name}</h2>
                            </td>
                            <td>{item.item_partNo}</td>
                            <td>{item.item_price}</td>
                            <td>{item.item_quantity}</td>
                            <td>{item.item_IGST ? item.item_IGST : 0}</td>
                            <td>{item.item_CGST ? item.item_CGST : 0}</td>
                            <td>{item.item_SGST ? item.item_SGST : 0}</td>
                            <td>{item.item_total_price}</td>
                            <td>
                              <a
                                className="btn btn-sm bg-danger-light"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteItem(i);
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
  );
};

export default AllItemListEdit;
