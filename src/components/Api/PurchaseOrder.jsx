// All axios api here of stpurchaseorderInfoudentsSubPurchaseOrder
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new purchaseorder data in our database
const addPurchaseOrder = async (data) => {
  try {
    console.log("add new purchaseorder data sending", data);
    const response = await axios.post(
      `${url}/purchaseorder/addpurchaseorder`,
      data
    );
    console.log("add new purchaseorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add purchaseorder API", error.message);
    return error;
  }
};

const getAllPurchaseOrder = async (data) => {
  try {
    console.log("get all purchaseorder data sending", data);
    const response = await axios.post(
      `${url}/purchaseorder/getallpurchaseorder`,
      data
    );
    console.log("get all purchaseorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all purchaseorder API", error.message);
    return error;
  }
};

// adding a new purchaseorder data in our database
const addVendorBill = async (data) => {
  try {
    console.log("add new addvendorbill data sending", data);
    const response = await axios.post(
      `${url}/purchaseorder/addvendorbill`,
      data
    );
    console.log("add new addvendorbill response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add addvendorbill API", error.message);
    return error;
  }
};

const getVendorBill = async (data) => {
  try {
    console.log("add new getvendorbill data sending", data);
    const response = await axios.post(
      `${url}/purchaseorder/getvendorbill`,
      data
    );
    console.log("add new getvendorbill response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while getvendorbill API", error.message);
    return error;
  }
};

const downloadVendorBill = async (data) => {
  return axios.post(`${url}/purchaseorder/downloadvendorbill`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "arraybuffer",
    data
  });
};

export {
  addPurchaseOrder,
  getAllPurchaseOrder,
  addVendorBill,
  getVendorBill,
  downloadVendorBill,
};
