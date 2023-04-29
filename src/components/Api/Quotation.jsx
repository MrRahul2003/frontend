// All axios api here of stquotationInfoudentsSubQuotation
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new quotation data in our database
const addQuotation = async (data) => {
  try {
    console.log("add new quotation data sending", data);
    const response = await axios.post(`${url}/quotation/addquotation`, data);
    console.log("add new quotation response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add quotation API", error.message);
    return error;
  }
};

const getQuotation = async (data) => {
  try {
    console.log("get new quotation data sending", data);
    const response = await axios.post(`${url}/quotation/getquotation`, data);
    console.log("get new quotation response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get quotation API", error.message);
    return error;
  }
};

// adding a new quotation data in our database
const editQuotation = async (data) => {
  try {
    console.log("edit new quotation data sending", data);
    const response = await axios.post(`${url}/quotation/editquotation`, data);
    console.log("edit new quotation response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit quotation API", error.message);
    return error;
  }
};

// adding a new enquiry data in our database
const genPurchaseOrder = async (data) => {
  try {
    console.log("gen new purchaseorder data sending", data);
    const response = await axios.post(`${url}/purchaseorder/genpurchaseorder`, data);
    console.log("gen new purchaseorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send purchaseorder API", error.message);
    return error;
  }
};

// adding a new enquiry data in our database
const sendPurchaseOrder = async (data) => {
  try {
    console.log("send new purchaseorder data sending", data);
    const response = await axios.post(`${url}/purchaseorder/sendpurchaseorder`, data);
    console.log("send new purchaseorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send purchaseorder API", error.message);
    return error;
  }
};

// adding a new quotation data in our database
const deleteQuotation = async (data) => {
  try {
    console.log("deleteQuotation data sending", data);
    const response = await axios.post(`${url}/quotation/deletequotation`, data);
    console.log("deleteQuotation response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete quotation API", error.message);
    return error;
  }
};

export { addQuotation, getQuotation, editQuotation, genPurchaseOrder, sendPurchaseOrder, deleteQuotation};
