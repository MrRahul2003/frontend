import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

// api
import { genProduct, sendProduct } from "../../Api/Product";
import { getContact } from "../../Api/Contact";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addProductOrder } from "../../Api/ProductOrder";

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
  const [GstTypeInfo, setGstTypeInfo] = useState("");

  const [productDetails, setProductDetails] = useState({
    packing_charge: "@ 3%",
    transport_charge: "ON PARTIES ACCOUNT",
    payment_terms: "AGAINST PROFORMA INVOICE",
    delivery: "READY STOCK",
    offer_validity: "7 DAYS FROM ISSUE",
  });

  // updating the add contact data on changing the values
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProductDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

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
    if (
      productDetails.packing_charge === "" ||
      productDetails.transport_charge === "" ||
      productDetails.payment_terms === "" ||
      productDetails.delivery === "" ||
      productDetails.offer_validity === ""
    ) {
      Swal.fire("Enter all Details before procedding!");
    } else {
      e.preventDefault();
      const productorder_addingdate = new Date().toLocaleString();

      const getRandomName = () => {
        let rand = Date.now() + Math.floor(Math.random());
        console.log(Date.now(), Math.random());
        return rand;
      };

      const data = {
        employee_id: loginId,
        employee_email: email,

        packing_charge: productDetails.packing_charge,
        transport_charge: productDetails.transport_charge,
        payment_terms: productDetails.payment_terms,
        delivery: productDetails.delivery,
        offer_validity: productDetails.offer_validity,

        uuid_id: getRandomName(),
        productorder_contact_id: props.enquiryInfo.enquiry_contact_id,
        enquiry_id: props.enquiryInfo._id,
        productorder_addingdate: productorder_addingdate,

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
            const resProduct = await addProductOrder(data);
            setLoading(false);
            console.log(res.data);

            if (res.status === 200 && resProduct.status === 200) {
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
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <select
                          className="form-control select"
                          onChange={(e) => {
                            return setGstTypeInfo(e.target.value);
                          }}
                          name="gst_type"
                        >
                          <option value="" className="active">
                            Select Gst Type
                          </option>
                          <option value="IGST">IGST</option>
                          <option value="CGST/SGST">CGST / SGST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Make</th>
                        <th>Modal No</th>
                        <th>Part No</th>
                        <th>HSN Code</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        {GstTypeInfo === "" ? null : GstTypeInfo === "IGST" ? (
                          <th>IGST</th>
                        ) : (
                          <>
                            <th>CGST</th>
                            <th>SGST</th>
                          </>
                        )}
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

                              <td>
                                <input
                                  type="text"
                                  className="col-md-3 form-control"
                                  id={"item_HSN" + i}
                                  onChange={() => {
                                    let q = document.getElementById(
                                      "item_HSN" + i
                                    ).value;
                                    item.item_HSN = q;
                                    console.log(item.item_HSN);
                                  }}
                                />
                              </td>

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

                              {GstTypeInfo === "" ? null : GstTypeInfo ===
                                "IGST" ? (
                                <td>
                                  <input
                                    type="Number"
                                    className="col-md-3 form-control"
                                    id={"item_IGST" + i}
                                    onChange={() => {
                                      let q = document.getElementById(
                                        "item_IGST" + i
                                      ).value;
                                      if (isNaN(q)) {
                                        alert("enter valid number");
                                      } else {
                                        item.item_IGST = q;
                                        console.log(item.item_IGST);
                                      }
                                    }}
                                  />
                                </td>
                              ) : (
                                <>
                                  <td>
                                    <input
                                      type="Number"
                                      className="col-md-3 form-control"
                                      id={"item_CGST" + i}
                                      onChange={() => {
                                        let q = document.getElementById(
                                          "item_CGST" + i
                                        ).value;
                                        if (isNaN(q)) {
                                          alert("enter valid number");
                                        } else {
                                          item.item_CGST = q;
                                          console.log(item.item_CGST);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="Number"
                                      className="col-md-3 form-control"
                                      id={"item_SGST" + i}
                                      onChange={() => {
                                        let q = document.getElementById(
                                          "item_SGST" + i
                                        ).value;
                                        if (isNaN(q)) {
                                          alert("enter valid number");
                                        } else {
                                          item.item_SGST = q;
                                          console.log(item.item_SGST);
                                        }
                                      }}
                                    />
                                  </td>
                                </>
                              )}

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

                  <div className="row my-4">
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          PACKING CHARGE
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          onChange={insertFields}
                          name="packing_charge"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          TRANSPORT CHARGES
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          onChange={insertFields}
                          name="transport_charge"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          PAYMENTS TERMS
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          onChange={insertFields}
                          name="payment_terms"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          DELIVERY
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          onChange={insertFields}
                          name="delivery"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          OFFER VALIDITY
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          onChange={insertFields}
                          name="offer_validity"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary my-4 mx-3"
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
