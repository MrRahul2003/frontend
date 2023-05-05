import React, { useState, useEffect, useContext } from "react";

// Api
import { deleteNotes, getAllNotes } from "../../Api/ContactNotes";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Notes = ({ contactInfo }) => {
  const MySwal = withReactContent(Swal);

  const [allContactNotes, setAllContactNotes] = useState([]);

  const { updateStatus, setUpdateStatus } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  // --------------get all contact notes related to this company----------------------------------------
  const getAllContactsNotesData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllNotes(data);
    console.log("all contact notes", response.data.notes);

    const unfiltered = response.data.notes;
    const filtered = unfiltered.filter((item) => {
      return item.contact_id === contactInfo._id;
    });
    setAllContactNotes(filtered);
  };

  useEffect(() => {
    getAllContactsNotesData();
  }, [updateStatus]);
  // --------------------------------------------------------------------------------------------------

  return (
    <div className="tab-pane fade" id="shownotes">
      <div className="content container-fluid">
        {/* <Filter /> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Notes</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <a href="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </a>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allContactNotes.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.note_title}</td>
                            <td>{item.note_desc}</td>
                            <td>{item.note_addingdate}</td>
                            <td className="text-end">
                              <div className="actions">
                                {/* ----------------------------Delete notes by clicking here--------------------------------------- */}
                                <a
                                  className="btn btn-sm bg-danger-light"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    const data = {
                                      employee_id: loginId,
                                      employee_email: email,
                                      note_id: item._id,
                                    };

                                    const response = await deleteNotes(data);
                                    console.log(response.data);
                                    if (response.status === 200) {
                                      Swal.fire(
                                        "Deleted!",
                                        "Your Note has been deleted.",
                                        "success"
                                      );
                                      setUpdateStatus(!updateStatus);
                                    } else {
                                      Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Something went wrong!",
                                      });
                                    }
                                  }}
                                >
                                  <i className="feather-delete" />
                                </a>
                                {/* --------------------------------------------------------------------------------------------------- */}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
