import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// components

// Api
import { LoginContext } from "../../context/LoginProvider";

// context hooks
import FormHeading from "../components/FormHeading";
import AllItemList from "./AllItemList";

import ItemTable from "./ItemTable";
import { genCustomerOrder, sendCustomerOrder } from "../../Api/Customer";

const ProductOrderForm = ({ enquiryInfo }) => {
  // const { email, loginId } = useContext(LoginContext);
  const { updateStatus, setUpdateStatus } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // ---------------------------storing items in enquiry data when user add it on form----------------------------------
  const [ItemList, setItemList] = useState([]); // storing all items here

  useEffect(() => {
    setItemList(enquiryInfo.itemList);
  }, []);

  // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      employee_id: loginId,
      employee_email: email,

      enquiryInfo: enquiryInfo,
      itemList: ItemList,
    };

    const response = await genCustomerOrder(data);
    console.log(response);

    if (response.status === 200) {
      alert("product order generated successfully");

      const res = await sendCustomerOrder(data);
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
      <AllItemList deleteItem={deleteItem} ItemList={ItemList} />
    </>
  );
};

export default ProductOrderForm;
