// All axios api here of stproductorderInfoudentsSubProductOrder
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new productorder data in our database
const addProductOrder = async (data) => {
  try {
    console.log("add new productorder data sending", data);
    const response = await axios.post(`${url}/productorder/addproductorder`, data);
    console.log("add new productorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add productorder API", error.message);
    return error;
  }
};

const getAllProductOrder = async (data) => {
  try {
    console.log("get all productorder data sending", data);
    const response = await axios.post(`${url}/productorder/getallproductorder`, data);
    console.log("get all productorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all productorder API", error.message);
    return error;
  }
};

const getProductOrder= async (data) => {
  try {
    console.log("get all productorder data sending", data);
    const response = await axios.post(`${url}/productorder/getproductorder`, data);
    console.log("get all productorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all productorder API", error.message);
    return error;
  }
};

export { addProductOrder, getAllProductOrder, getProductOrder};