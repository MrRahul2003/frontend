import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { genProduct, sendProduct } from "../../Api/Product";
import { getContact } from "../../Api/Contact";

const AllItemList = (props) => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const deleteItem = (id) => {
    props.deleteItem(id);
  };

  const [AllItemsData, setAllItemsData] = useState([]);
  const [num, setnum] = useState();
  const [contactDetails, setcontactDetails] = useState({});

  useEffect(() => {
    setAllItemsData(props.ItemList);
  }, [props.ItemList]);

  useEffect(() => {
    const getContactUserData = async () => {
      const data = {
        employee_id: props.enquiryInfo.employee_id,
        employee_email: props.enquiryInfo.employee_email,
        contact_id: props.enquiryInfo.enquiry_contact_id
      }
      const response = await getContact(data);
      console.log(response.data.contacts[0]);
      setcontactDetails(response.data.contacts[0])
    }
    getContactUserData();
  }, []);

  // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      employee_id: loginId,
      employee_email: email,

      contactDetails: contactDetails,
      itemList: AllItemsData,
    };

    const response = await genProduct(data);
    console.log(response);

    if (response.status === 200) {
      alert("purchase order generated successfully");

      const res = await sendProduct(data);
      console.log(res);
      if (response.status === 200) {
        alert("mail send successfully");
        navigate("/enquirysales/showenquiry");
      } else {
        alert("invalid credentials");
      }
    } else {
      alert("invalid credentials");
    }
  };

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
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <a href="#" className="btn btn-outline-primary me-2">
                      <i className="fas fa-download" /> Download
                    </a>
                    <NavLink
                      to="/contacts/addcontacts"
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus" />
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <form>
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Make</th>
                        <th>Modal No</th>
                        <th>Part No</th>
                        <th>Price</th>
                        <th>Quantity</th>
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
                              <td>
                                <h2>{item.item_name}</h2>
                              </td>
                              <td>{item.item_make}</td>
                              <td>{item.item_modalNo}</td>
                              <td>{item.item_partNo}</td>
                              
                              <td>
                                <input
                                  type="Number"
                                  id={"item_price" + i}
                                  onChange={() => {
                                    let q = document.getElementById(
                                      "item_price" + i
                                    ).value;
                                    if (isNaN(q)) {
                                      alert("enter valid number");
                                    } else {
                                      item.item_price = q;
                                      console.log(item.item_price);
                                    }
                                  }}
                                />
                              </td>
                              
                              <td>
                                <input
                                  type="Number"
                                  id={"item_quantity" + i}
                                  onChange={() => {
                                    let q = document.getElementById(
                                      "item_quantity" + i
                                    ).value;
                                    if (isNaN(q)) {
                                      alert("enter valid number");
                                    } else {
                                      item.item_quantity = q;
                                      console.log(item.item_quantity);
                                    }
                                  }}
                                />
                              </td>
                              
                              <td>
                                <input
                                  type="Number"
                                  id={"item_total_price" + i}
                                  onChange={() => {
                                    let q = document.getElementById(
                                      "item_total_price" + i
                                    ).value;
                                    if (isNaN(q)) {
                                      alert("enter valid number");
                                    } else {
                                      item.item_total_price = q;
                                      console.log(item.item_total_price);
                                    }
                                  }}
                                />
                              </td>

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
                  <button
                    className="btn btn-primary mt-4"
                    type="button"
                    onClick={submitForm}
                  >
                    Send To Customer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllItemList;
