// All axios api here of students
import axios from "axios";

// private
import { backendURL } from "../private/Private";
const url = backendURL;

// adding a new notes data in our database
const addNotes = async (data) => {
  try {
    console.log("addNotes data sending", data);
    const response = await axios.post(
      `${url}/companynotes/addcompanynotes`,
      data
    );
    console.log("addNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while add notes API", error.message);
    return error;
  }
};

// getting all the companies notes data in our database
const getAllNotes = async (data) => {
  try {
    console.log("getAllNotes data sending", data);
    const response = await axios.post(
      `${url}/companynotes/getallcompaniesnotes`,
      data
    );
    console.log("getAllNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get all companies API", error.message);
    return error;
  }
};

// getting a single notes data in our database
const getNotes = async (data) => {
  try {
    console.log("getNotes data sending", data);
    const response = await axios.post(
      `${url}/companynotes/getcompanynotes`,
      data
    );
    console.log("getNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while get a single companies API", error.message);
    return error;
  }
};

// adding a new notes data in our database
const deleteNotes = async (data) => {
  try {
    console.log("deleteNotes data sending", data);
    const response = await axios.post(
      `${url}/companynotes/deletecompanynotes`,
      data
    );
    console.log("deleteNotes response receiving", response);
    return response;
  } catch (error) {
    console.log("Error while delete notes API", error.message);
    return error;
  }
};

export { addNotes, getAllNotes, getNotes, deleteNotes };
