import React, { useState, useEffect, useContext } from "react";

// Api
import { deleteNotes, getAllNotes } from "../../Api/CompanyNotes";

// context hooks
import { LoginContext } from "../../context/LoginProvider";

const Notes = ({ companyInfo }) => {
  const [allCompanyNotes, setAllCompanyNotes] = useState([]);

  const { updateStatus, setUpdateStatus } =
    useContext(LoginContext);

    const loginId = localStorage.getItem("loginId");
    const email = localStorage.getItem("email");

  // --------------get all company notes related to this company----------------------------------------
  const getAllCompaniesNotesData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllNotes(data);
    console.log("all companies notes", response.data.notes);

    const unfiltered = response.data.notes;
    const filtered = unfiltered.filter((item) => {
      return item.company_id === companyInfo._id;
    });
    setAllCompanyNotes(filtered);
  };

  useEffect(() => {
    getAllCompaniesNotesData();
  }, [updateStatus]);
  // --------------------------------------------------------------------------------------------------

  return (
    <div className="tab-pane fade" id="shownotes">
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Notes</h3>
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
                      {allCompanyNotes.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.note_title}</td>
                            <td>{item.note_desc}</td>
                            <td>{item.note_addingdate}</td>
                            <td className="text-start">
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
                                    alert("Company notes deleted successfully");
                                    setUpdateStatus(!updateStatus);
                                  } else {
                                    alert("invalid credentials");
                                  }
                                }}
                              >
                                <i className="feather-delete" />
                              </a>
                              {/* --------------------------------------------------------------------------------------------------- */}
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
