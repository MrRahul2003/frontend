import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// components

// Api
// import { addEnquiry } from "../../../Api/Enquiry";
import { LoginContext } from "../../context/LoginProvider";

// context hooks
import FormHeading from "../components/FormHeading";
import AllItemList from "./AllItemList";
import { addQuotation } from "../../Api/Quotation";
import { getAllVendor } from "../../Api/Vendor";

const AddQuotationForm = ({ enquiryInfo }) => {
  // const { email, loginId } = useContext(LoginContext);
  const { updateStatus, setUpdateStatus } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [allVendor, setAllVendor] = useState([]);
  //  ---------------------fetching all vendors from database related to login user-------------------------
  const getAllVendorData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllVendor(data);
    console.log(response.data);
    setAllVendor(response.data);
  };

  useEffect(() => {
    getAllVendorData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  // ---------------------------storing items in enquiry data when user add it on form----------------------------------
  const [ItemList, setItemList] = useState([]); // storing all items here
  const [vendorInfo, setVendorInfo] = useState("");

  // storing a single item while onchange is running
  const [itemInfo, setItemInfo] = useState({
    item_name: "",
    item_make: "",
    item_modalNo: "",
    item_partNo: "",
    item_price: "",
    item_quantity: "",
    item_total_price: "",
  });

  // updating the add enquiry item data on changing the values
  const insertItems = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setItemInfo((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  // finally storing the onchanging item in ItemList
  const AddItemList = () => {
    setItemList((preVal) => {
      return [...preVal, itemInfo];
    });

    setItemInfo({
      item_name: "",
      item_make: "",
      item_modalNo: "",
      item_partNo: "",
      item_price: "",
      item_quantity: "",
      item_total_price: "",
    });
  };
  // -----------------------------------------------------------------------------------------------

  // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();
    const quotation_addingdate = new Date().toLocaleString();
    if (
      vendorInfo === "" ||
      itemInfo.item_name !== "" ||
      itemInfo.item_make !== "" ||
      itemInfo.item_modalNo !== "" ||
      itemInfo.item_partNo !== "" ||
      itemInfo.item_price !== "" ||
      itemInfo.item_quantity !== "" ||
      itemInfo.item_total_price !== ""
    ) {
      alert("Enter the Details or add item to list");
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,
        enquiry_contact_id: enquiryInfo.enquiry_contact_id,
        enquiry_id: enquiryInfo._id,

        vendor_id: vendorInfo,

        quotation_addingdate: quotation_addingdate,
        itemList: ItemList,
      };

      const response = await addQuotation(data);
      console.log(response);

      if (response.status === 200) {
        alert("quotation added successfully");
        document.getElementById("addquotaionform").reset();
        setUpdateStatus(!updateStatus);
        setItemList([]);
        navigate("/enquirysales/showenquiry");
      } else {
        alert("invalid credentials");
      }
    }
  };

  // --------------------------deleting the items befor submitting the form----------------------------------------
  const deleteItem = (id) => {
    console.log(id);

    setItemList((preVal) => {
      return preVal.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };
  // -----------------------------------------------------------------------------------------------

  return (
    <>
      <form id="addquotaionform">
        <div className="row">
          <div className="col-12 col-sm-12">
            <div className="col-12 d-flex">
              <h5 className="form-title student-info">Vendor Details</h5>
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
              <label>
                Vendor Name <span className="login-danger">*</span>
              </label>
              <select
                className="form-control select"
                onChange={(e) => {
                  return setVendorInfo(e.target.value);
                }}
                name="vendor_id"
              >
                <option value="">Select Vendor Name</option>

                {allVendor.map((item, i) => {
                  return (
                    <option value={item._id} key={i}>
                      {item.vendor_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12">
            <div className="col-12 d-flex">
              <h5 className="form-title student-info">Quotation Items</h5>
            </div>
          </div>

          <div className="col-12 col-sm-3">
            <div className="form-group local-forms">
              <label>
                Name
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                onChange={insertItems}
                value={itemInfo.item_name}
                name="item_name"
              />
            </div>
          </div>

          <div className="col-12 col-sm-3">
            <div className="form-group local-forms">
              <label>
                Make
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                onChange={insertItems}
                value={itemInfo.item_make}
                name="item_make"
              />
            </div>
          </div>

          <div className="col-12 col-sm-3">
            <div className="form-group local-forms">
              <label>
                Modal No
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                onChange={insertItems}
                value={itemInfo.item_modalNo}
                name="item_modalNo"
              />
            </div>
          </div>

          <div className="col-12 col-sm-3">
            <div className="form-group local-forms">
              <label>
                Part No
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                onChange={insertItems}
                value={itemInfo.item_partNo}
                name="item_partNo"
              />
            </div>
          </div>

          <div className="col-12 col-sm-2">
            <div className="form-group local-forms">
              <label>
                Price (₹)
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                onChange={insertItems}
                value={itemInfo.item_price}
                name="item_price"
              />
            </div>
          </div>

          <div className="col-12 col-sm-2">
            <div className="form-group local-forms">
              <label>
                Quantity
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                onChange={insertItems}
                value={itemInfo.item_quantity}
                name="item_quantity"
              />
            </div>
          </div>

          <div className="col-12 col-sm-2">
            <div className="form-group local-forms">
              <label>
                Total (₹)
                <span className="login-danger">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                onChange={insertItems}
                value={itemInfo.item_total_price}
                name="item_total_price"
              />
            </div>
          </div>

          <div className="col-12 col-sm-1">
            <div className="form-group local-forms">
              <a className="btn btn-primary" onClick={AddItemList}>
                <i className="fas fa-plus" />
              </a>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="student-submit">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <AllItemList deleteItem={deleteItem} ItemList={ItemList} />
    </>
  );
};

export default AddQuotationForm;
