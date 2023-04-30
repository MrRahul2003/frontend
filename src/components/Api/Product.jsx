// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new product data in our database
const genProduct = async (data) => {
  try {
    console.log("gen new product data sending", data);
    const response = await axios.post(`${url}/productorder/genproductorder`, data);
    console.log("gen new product response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send product API", error.message);
    return error;
  }
};

// adding a new product data in our database
const sendProduct = async (data) => {
  try {
    console.log("send new product data sending", data);
    const response = await axios.post(`${url}/productorder/sendproductorder`, data);
    console.log("send new product response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send product API", error.message);
    return error;
  }
};

// adding a new product data in our database
const addProduct = async (data) => {
  try {
    console.log("addProduct data sending", data);
    const response = await axios.post(`${url}/product/addproduct`, data);
    console.log("addProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add product API", error.message);
    return error;
  }
};

// getting all the product data in our database
const getAllProduct = async (data) => {
  try {
    console.log("getAllProducts data sending", data);
    const response = await axios.post(`${url}/product/getallproduct`, data);
    console.log("getAllProducts response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all product API", error.message);
    return error;
  }
};

// getting all the product data in our database
const getProduct = async (data) => {
  try {
    console.log("getProducts data sending", data);
    const response = await axios.post(`${url}/product/getproduct`, data);
    console.log("getProducts response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get products API", error.message);
    return error;
  }
};

// adding a new product data in our database
const editProduct = async (data) => {
  try {
    console.log("editProduct data sending", data);
    const response = await axios.post(`${url}/product/editproduct`, data);
    console.log("editProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit product API", error.message);
    return error;
  }
};

// deleting a new product data in our database
const deleteProduct = async (data) => {
  try {
    console.log("deleteProduct data sending", data);
    const response = await axios.post(`${url}/product/deleteproduct`, data);
    console.log("deleteProduct response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete product API", error.message);
    return error;
  }
};

export { addProduct, getProduct, getAllProduct, deleteProduct, editProduct, genProduct, sendProduct };
