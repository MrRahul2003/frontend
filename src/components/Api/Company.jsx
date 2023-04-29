// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new company data in our database
const addCompany = async (data) => {
  try {
    console.log("addCompany data sending", data);
    const response = await axios.post(`${url}/company/addcompany`, data);
    console.log("addCompany response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add company API", error.message);
    return error;
  }
};

// getting all the companies data in our database
const getAllCompanys = async (data) => {
  try {
    console.log("getAllCompanys data sending", data);
    const response = await axios.post(`${url}/company/getallcompanies`, data);
    console.log("getAllCompanys response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all companies API", error.message);
    return error;
  }
};

// getting a single company data in our database
const getCompany = async (data) => {
  try {
    console.log("getCompany data sending", data);
    const response = await axios.post(`${url}/company/getcompany`, data);
    console.log("getCompany response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get a single companies API", error.message);
    return error;
  }
};

// adding a new company data in our database
const editCompany = async (data) => {
  try {
    console.log("editCompany data sending", data);
    const response = await axios.post(`${url}/company/editcompany`, data);
    console.log("editCompany response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit company API", error.message);
    return error;
  }
};

// adding a new company data in our database
const deleteCompany = async (data) => {
  try {
    console.log("deleteCompany data sending", data);
    const response = await axios.post(`${url}/company/deletecompany`, data);
    console.log("deleteCompany response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete company API", error.message);
    return error;
  }
};

export { addCompany, getAllCompanys, getCompany, editCompany, deleteCompany };
