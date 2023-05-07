import React, { useState, useEffect } from "react";

const Filter = ({ setAllContact, allContact, setAllContactsFiltered }) => {
  const [search, setSearch] = useState({
    contact_name: "",
    contact_email: "",
    contact_status: "",
  });

  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearch((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const filteringFunction = async () => {
    var filteredData = await allContact.filter(
      (item) =>
        item.contact_name
          .toLowerCase()
          .includes(search.contact_name.toLocaleLowerCase()) &&
        item.contact_email
          .includes(search.contact_email) &&
        item.contact_status
          .toLowerCase()
          .includes(search.contact_status.toLocaleLowerCase())
    );
    setAllContactsFiltered(filteredData);
    console.log("filtered contact", filteredData);
  };

  useEffect(() => {
    filteringFunction();
  }, [allContact]);

  const submitForm = async (e) => {
    e.preventDefault();
    filteringFunction();
  };

  return (
    <>
      <div className="student-group-form">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name ..."
                onChange={insertFields}
                name="contact_name"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Email ..."
                onChange={insertFields}
                name="contact_email"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select
                className="form-control select"
                onChange={insertFields}
                name="contact_status"
              >
                <option value="" className="active">
                  Select Status ...
                </option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="search-student-btn">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitForm}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
