import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import AllItemList from "./AllItemList";

// Api
import { genCustomerOrder, sendCustomerOrder } from "../../Api/Customer";

const ProductOrderForm = ({ enquiryInfo }) => {

  // ---------------------------storing items in enquiry data when user add it on form----------------------------------
  const [ItemList, setItemList] = useState([]); // storing all items here

  useEffect(() => {
    setItemList(enquiryInfo.itemList);
  }, []);

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
      <AllItemList deleteItem={deleteItem} ItemList={ItemList} enquiryInfo={enquiryInfo} />
    </>
  );
};

export default ProductOrderForm;
