// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new subproduct data in our database
const addSubProduct = async (data) => {
  try {
    console.log("addSubProduct data sending", data);
    const response = await axios.post(`${url}/subproduct/addsubproduct`, data);
    console.log("addSubProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add subproduct API", error.message);
    return error;
  }
};

// getting all the subproduct data in our database
const getAllSubProduct = async (data) => {
  try {
    console.log("getAllSubProducts data sending", data);
    const response = await axios.post(
      `${url}/subproduct/getallsubproduct`,
      data
    );
    console.log("getAllSubProducts response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all companies API", error.message);
    return error;
  }
};

// getting a subproduct data in our database
const getSubProduct = async (data) => {
  try {
    console.log("getSubProducts data sending", data);
    const response = await axios.post(`${url}/subproduct/getsubproduct`, data);
    console.log("getSubProducts response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get a companies API", error.message);
    return error;
  }
};

// getting some of the subproduct data in our database
const getSomeSubProduct = async (data) => {
  try {
    console.log("getAllSubProducts data sending", data);
    const response = await axios.post(
      `${url}/subproduct/getsomesubproduct`,
      data
    );
    console.log("getAllSubProducts response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all companies API", error.message);
    return error;
  }
};

// editing a subproduct data in our database
const editSubProduct = async (data) => {
  try {
    console.log("editSubProduct data sending", data);
    const response = await axios.post(`${url}/subproduct/editsubproduct`, data);
    console.log("editSubProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit subproduct API", error.message);
    return error;
  }
};

// deleting a subproduct data in our database
const deleteSubProduct = async (data) => {
  try {
    console.log("deleteSubProduct data sending", data);
    const response = await axios.post(
      `${url}/subproduct/deletesubproduct`,
      data
    );
    console.log("deleteSubProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete subproduct API", error.message);
    return error;
  }
};

// deleting entire subproduct data in our database as soon as product is deleted
const deleteEntireSubProduct = async (data) => {
  try {
    console.log("deleteEntireSubProduct data sending", data);
    const response = await axios.post(
      `${url}/subproduct/deleteentiresubproduct`,
      data
    );
    console.log("deleteEntireSubProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete Entiresubproduct API", error.message);
    return error;
  }
};

export {
  addSubProduct,
  getAllSubProduct,
  getSubProduct,
  getSomeSubProduct,
  editSubProduct,
  deleteSubProduct,
  deleteEntireSubProduct,
};
