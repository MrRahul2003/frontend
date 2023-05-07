import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// api
import { genProduct, sendProduct } from "../../Api/Product";
import { getContact } from "../../Api/Contact";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AllItemList = (props) => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const deleteItem = (id) => {
    props.deleteItem(id);
  };

  const [AllItemsData, setAllItemsData] = useState([]);
  const [contactDetails, setcontactDetails] = useState({});

  useEffect(() => {
    setAllItemsData(props.ItemList);
  }, [props.ItemList]);

  useEffect(() => {
    const getContactUserData = async () => {
      const data = {
        employee_id: props.enquiryInfo.employee_id,
        employee_email: props.enquiryInfo.employee_email,
        contact_id: props.enquiryInfo.enquiry_contact_id,
      };
      const response = await getContact(data);
      console.log(response.data.contacts[0]);
      setcontactDetails(response.data.contacts[0]);
    };
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

    setLoading(true);
    const response = await genProduct(data);
    setLoading(false);
    console.log(response);

    if (response.status === 200) {
      Swal.fire({
        title: "Product Purchase Order has been generated?",
        text: "Do you wish to send it on Mail to customer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await sendProduct(data);
          setLoading(false);
          console.log(res.data);

          if (res.status === 200) {
            Swal.fire(
              "Sent!",
              "Your Product Purchase Order has been sent.",
              "success"
            );
            navigate("/enquirysales/showenquiry");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
                                  className="col-md-3 form-control"
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
                                  className="col-md-3 form-control"
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
                                  className="col-md-3 form-control"
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
                    disabled={loading}
                  >
                    {loading ? <>Sending..</> : <> Send To Customer</>}
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
