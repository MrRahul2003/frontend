import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// components

// Api
import { LoginContext } from "../../context/LoginProvider";

// context hooks
import FormHeading from "../components/FormHeading";
import AllItemList from "./AllItemList";
import {
  addQuotation,
  editQuotation,
  genPurchaseOrder,
  sendPurchaseOrder,
} from "../../Api/Quotation";
import ItemTable from "./ItemTable";
import { getVendor } from "../../Api/Vendor";

const PurchaseOrderForm = ({ quotationInfo, enquiryInfo }) => {
  // const { email, loginId } = useContext(LoginContext);
  const { updateStatus, setUpdateStatus } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // ---------------------------storing items in enquiry data when user add it on form----------------------------------
  const [ItemList, setItemList] = useState([]); // storing all items here
  const [vendorData, setVendorData] = useState({});
  //  ---------------------fetching all vendors from database related to login user-------------------------
  const getVendorData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      vendor_id: quotationInfo.vendor_id,
    };

    const response = await getVendor(data);
    console.log(response.data[0]);
    setVendorData(response.data[0]);
  };

  // -----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setItemList(quotationInfo.itemList);
    getVendorData();
  }, []);

  // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      employee_id: loginId,
      employee_email: email,

      vendorData: vendorData,
      itemList: ItemList,
    };

    const response = await genPurchaseOrder(data);
    console.log(response);

    if (response.status === 200) {
      alert("purchase order generated successfully");

      const res = await sendPurchaseOrder(data);
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

  // --------------------------deleting the items before submitting the form----------------------------------------
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
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <ItemTable ItemList={ItemList} />
          <div class="modal-footer">
            <div class="bank-details-btn">
              <NavLink
                to="/enquirysales/showenquiry"
                className="btn bank-cancel-btn me-2"
              >
                Cancel
              </NavLink>
              <button
                className="btn bank-cancel-btn me-2"
                type="button"
                onClick={submitForm}
              >
                Send To Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
      <AllItemList deleteItem={deleteItem} ItemList={ItemList} />
    </>
  );
};

export default PurchaseOrderForm;
