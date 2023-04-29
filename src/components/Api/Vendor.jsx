// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new vendor data in our database
const addVendor = async (data) => {
  try {
    console.log("addVendor data sending", data);
    const response = await axios.post(`${url}/vendor/addvendor`, data);
    console.log("addVendor response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add vendor API", error.message);
    return error;
  }
};

// getting all the vendor data in our database
const getAllVendor = async (data) => {
  try {
    console.log("getAllVendors data sending", data);
    const response = await axios.post(`${url}/vendor/getallvendors`, data);
    console.log("getAllVendors response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all companies API", error.message);
    return error;
  }
};

// getting a vendor data in our database
const getVendor = async (data) => {
  try {
    console.log("getVendors data sending", data);
    const response = await axios.post(`${url}/vendor/getvendor`, data);
    console.log("getVendors response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get vendors API", error.message);
    return error;
  }
};

// editing a vendor data in our database
const editVendor = async (data) => {
  try {
    console.log("editVendor data sending", data);
    const response = await axios.post(`${url}/vendor/editvendor`, data);
    console.log("editVendor response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit vendor API", error.message);
    return error;
  }
};

// deleting a vendor data in our database
const deleteVendor = async (data) => {
  try {
    console.log("deleteVendor data sending", data);
    const response = await axios.post(`${url}/vendor/deletevendor`, data);
    console.log("deleteVendor response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete vendor API", error.message);
    return error;
  }
};

export { addVendor, getVendor, getAllVendor, deleteVendor, editVendor };
