// All axios api here of studentsSubEnquiry
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new Login data in our database
const addLogin = async (data) => {
  try {
    console.log("addLogin data sending", data);
    const response = await axios.post(`${url}/authentication/login`, data);
    console.log("addLogin response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add Login API", error.message);
    return error;
  }
};

// adding a new Signin data in our database
const addSignin = async (data) => {
  try {
    console.log("addSignin data sending", data);
    const response = await axios.post(`${url}/authentication/signin`, data);
    console.log("addSignin response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add Signin API", error.message);
    return error;
  }
};

// getting a single login data in our database
const getLogin = async (data) => {
  try {
    console.log("getLogin data sending", data);
    const response = await axios.post(`${url}/login/getlogin`, data);
    console.log("getLogin response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get a single login API", error.message);
    return error;
  }
};

export { addLogin, getLogin, addSignin };
