// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new Contact data in our database
const addContact = async (data) => {
  try {
    console.log("addContact data sending", data);
    const response = await axios.post(`${url}/contact/addcontact`, data);
    console.log("addContact response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add Contact API", error.message);
    return error;
  }
};

// getting all the contact data in our database
const getAllContacts = async (data) => {
  try {
    console.log("getAllContacts data sending", data);
    const response = await axios.post(`${url}/contact/getallcontacts`, data);
    console.log("getAllContacts response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all contacts API", error.message);
    return error;
  }
};

// getting a single contact data in our database
const getContact = async (data) => {
  try {
    console.log("getContact data sending", data);
    const response = await axios.post(`${url}/contact/getcontact`, data);
    console.log("getContact response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get a single contact API", error.message);
    return error;
  }
};

// adding a new contact data in our database
const editContact = async (data) => {
  try {
    console.log("editContact data sending", data);
    const response = await axios.post(`${url}/contact/editcontact`, data);
    console.log("editContact response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while edit contact API", error.message);
    return error;
  }
};

// adding a new contact data in our database
const deleteContact = async (data) => {
  try {
    console.log("deleteContact data sending", data);
    const response = await axios.post(`${url}/contact/deletecontact`, data);
    console.log("deleteContact response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete contact API", error.message);
    return error;
  }
};

export { addContact, getAllContacts, getContact, editContact, deleteContact };
