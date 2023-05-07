import React, { useState, useContext, useEffect } from "react";

// Api
import { addNotes } from "../../Api/ContactNotes";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

// sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddNotes = ({ contactInfo }) => {

  const MySwal = withReactContent(Swal);

  const {updateStatus, setUpdateStatus } =
    useContext(LoginContext);
    const loginId = localStorage.getItem("loginId");
    const email = localStorage.getItem("email");
    
  // storing all notes data in usestate
  const [notesDetails, setnotesDetails] = useState({
    note_title: "",
    note_desc: "",
  });

  // updating the notes data as the value gets change
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setnotesDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // on submitting the form sending the notes data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    const note_addingdate = new Date().toLocaleString();

    if (notesDetails.note_title === "" || notesDetails.note_desc === "") {
      Swal.fire('Enter all Details before procedding!')
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,

        contact_id: contactInfo._id,
        contact_name: contactInfo.contact_name,

        note_title: notesDetails.note_title,
        note_desc: notesDetails.note_desc,

        note_addingdate: note_addingdate,
      };

      const response = await addNotes(data);
      console.log(response);

      if (response.status === 200) {
        Swal.fire(
          'Good job!',
          'New Note added successfully!',
          'success'
        )
        document.getElementById("contactnotesform").reset();
        setUpdateStatus(!updateStatus);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    }
  };

  return (
    <div className="tab-pane fade" id="addnotes">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">New Note</h5>
          <div className="row">
            <div className="col-md-10 col-lg-6">
              <form id="contactnotesform">
                <div className="form-group row">
                  <label className="col-form-label col-md-2">Title</label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title here"
                      onChange={insertFields}
                      name="note_title"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">Description</label>
                  <div className="col-md-10">
                    <textarea
                      rows="5"
                      cols="5"
                      className="form-control"
                      placeholder="Enter text here"
                      onChange={insertFields}
                      name="note_desc"
                    ></textarea>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={submitForm}
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
