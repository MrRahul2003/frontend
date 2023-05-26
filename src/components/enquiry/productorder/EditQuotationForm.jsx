import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import AllItemListEdit from "./AllItemListEdit";

// Api
import { editQuotation } from "../../Api/Quotation";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditQuotationForm = ({ quotationInfo, enquiryInfo }) => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const { updateStatus, setUpdateStatus } = useContext(LoginContext);
  const [GstTypeInfo, setGstTypeInfo] = useState("");

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // ---------------------------storing items in enquiry data when user add it on form----------------------------------
  const [ItemList, setItemList] = useState([]); // storing all items here

  useEffect(() => {
    setItemList(quotationInfo.itemList);
  }, []);

  // storing a single item while onchange is running
  const [itemInfo, setItemInfo] = useState({
    item_name: "",
    item_make: "",
    item_modalNo: "",
    item_partNo: "",
    item_price: "",
    item_quantity: "",
    item_IGST: 0,
    item_CGST: 0,
    item_SGST: 0,
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

  useEffect(() => {
    setItemInfo((preVal) => {
      return {
        ...preVal,
        item_IGST: 0,
        item_CGST: 0,
        item_SGST: 0,
      };
    });
  }, [GstTypeInfo]);

  // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();
    if (
      itemInfo.item_name !== "" ||
      itemInfo.item_make !== "" ||
      itemInfo.item_modalNo !== "" ||
      itemInfo.item_partNo !== "" ||
      itemInfo.item_price !== "" ||
      itemInfo.item_quantity !== "" ||
      itemInfo.item_total_price !== ""
    ) {
      Swal.fire("Enter all Details before procedding...!");
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,
        enquiry_contact_id: enquiryInfo.enquiry_contact_id,
        enquiry_id: quotationInfo.enquiry_id,
        quotation_id: quotationInfo._id,

        quotation_addingdate: quotationInfo.quotation_addingdate,
        itemList: ItemList,
      };

      setLoading(true);
      const response = await editQuotation(data);
      setLoading(false);
      console.log(response);

      if (response.status === 200) {
        Swal.fire("Good job!", "Changes made successfully!", "success");
        document.getElementById("addquotaionform").reset();
        setUpdateStatus(!updateStatus);
        setItemList([]);
        // navigate("/enquirysales/showenquiry");
        navigate(-1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
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
      <AllItemListEdit deleteItem={deleteItem} ItemList={ItemList} />
    </>
  );
};

export default EditQuotationForm;
