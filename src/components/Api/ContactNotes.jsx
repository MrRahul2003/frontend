// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new Notes data in our database
const addNotes = async (data) => {
  try {
    console.log("addNotes data sending", data);
    const response = await axios.post(
      `${url}/contactnotes/addcontactnotes`,
      data
    );
    console.log("addNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add Notes API", error.message);
    return error;
  }
};

// getting all the contactnotes data in our database
const getAllNotes = async (data) => {
  try {
    console.log("getAllNotes data sending", data);
    const response = await axios.post(
      `${url}/contactnotes/getallcontactnotes`,
      data
    );
    console.log("getAllNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all contactnotess API", error.message);
    return error;
  }
};

// getting a single contactnotes data in our database
const getNotes = async (data) => {
  try {
    console.log("getNotes data sending", data);
    const response = await axios.post(
      `${url}/contactnotes/getcontactnotes`,
      data
    );
    console.log("getNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get a single contactnotes API", error.message);
    return error;
  }
};

// adding a new contactnotes data in our database
const deleteNotes = async (data) => {
  try {
    console.log("deleteNotes data sending", data);
    const response = await axios.post(
      `${url}/contactnotes/deletecontactnotes`,
      data
    );
    console.log("deleteNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete contactnotes API", error.message);
    return error;
  }
};

export { addNotes, getAllNotes, getNotes, deleteNotes };
