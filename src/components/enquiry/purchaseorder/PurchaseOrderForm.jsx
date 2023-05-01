import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// components
import AllItemList from "./AllItemList";
import ItemTable from "./ItemTable";

// Api
import { genPurchaseOrder, sendPurchaseOrder } from "../../Api/Quotation";
import { getVendor } from "../../Api/Vendor";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PurchaseOrderForm = ({ quotationInfo, enquiryInfo }) => {

  const MySwal = withReactContent(Swal);

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
      Swal.fire({
        title: "Purchase Order has been generated?",
        text: "Do you wish to send it on Mail to vendors!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await sendPurchaseOrder(data);
          console.log(res.data);

          if (res.status === 200) {
            Swal.fire("Sent!", "Your Purchase Order has been sent.", "success");
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
