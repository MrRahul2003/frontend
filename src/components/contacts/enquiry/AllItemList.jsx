import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

const AllItemList = (props) => {
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
                      <th>Name</th>
                      <th>Make</th>
                      <th>Modal No</th>
                      <th>Part No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllItemsData &&
                      AllItemsData.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.item_name}</td>
                            <td>{item.item_make}</td>
                            <td>{item.item_modalNo}</td>
                            <td>{item.item_partNo}</td>
                            <td className="text-start">
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

export default AllItemList;
