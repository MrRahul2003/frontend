// All axios api here of studentsSubCustomerOrder
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new customerorder data in our database
const genCustomerOrder = async (data) => {
  try {
    console.log("gen new customerorder data sending", data);
    const response = await axios.post(
      `${url}/customerorder/gencustomerorder`,
      data
    );
    console.log("gen new customerorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send customerorder API", error.message);
    return error;
  }
};

// adding a new customerorder data in our database
const sendCustomerOrder = async (data) => {
  try {
    console.log("send new customerorder data sending", data);
    const response = await axios.post(
      `${url}/customerorder/sendcustomerorder`,
      data
    );
    console.log("send new customerorder response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while send customerorder API", error.message);
    return error;
  }
};

export { genCustomerOrder, sendCustomerOrder };
