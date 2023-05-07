// All axios api here of studentsSubEnquiry
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new enquiry data in our database
const genEnquiry = async (data) => {
  try {
    console.log("gen new enquiry data sending", data);
    const response = await axios.post(`${url}/enquiry/genenquiry`, data);
    console.log("gen new enquiry response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send enquiry API", error.message);
    return error;
  }
};

// adding a new enquiry data in our database
const sendEnquiry = async (data) => {
  try {
    console.log("send new enquiry data sending", data);
    const response = await axios.post(`${url}/enquiry/sendenquiry`, data);
    console.log("send new enquiry response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send enquiry API", error.message);
    return error;
  }
};

// adding a new enquiry data in our database
const addEnquiry = async (data) => {
  try {
    console.log("add new enquiry data sending", data);
    const response = await axios.post(`${url}/enquiry/addenquiry`, data);
    console.log("add new enquiry response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add enquiry API", error.message);
    return error;
  }
};

// getting all the enquiry data in our database
const getAllEnquiry = async (data) => {
  try {
    console.log("getAllEnquirys data sending", data);
    const response = await axios.post(`${url}/enquiry/getallenquiry`, data);
    console.log("getAllEnquirys response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all enquiry API", error.message);
    return error;
  }
};

// getting all the enquiry data in our database for pipeline
const getPipelineEnquiry = async (data) => {
  try {
    console.log("getAllEnquirys data sending", data);
    const response = await axios.post(
      `${url}/enquiry/getpipelineenquiry`,
      data
    );
    console.log("getAllEnquirys response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all enquiry API", error.message);
    return error;
  }
};

// editing a enquiry data in our database
const editEnquiry = async (data) => {
  try {
    console.log("edit new enquiry data sending", data);
    const response = await axios.post(`${url}/enquiry/editenquiry`, data);
    console.log("edit new enquiry response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit enquiry API", error.message);
    return error;
  }
};

// deleting a enquiry data in our database
const deleteEnquiry = async (data) => {
  try {
    console.log("deleteEnquiry data sending", data);
    const response = await axios.post(`${url}/enquiry/deleteenquiry`, data);
    console.log("deleteEnquiry response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete enquiry API", error.message);
    return error;
  }
};
export {
  addEnquiry,
  getAllEnquiry,
  deleteEnquiry,
  getPipelineEnquiry,
  editEnquiry,
  sendEnquiry,
  genEnquiry
};
