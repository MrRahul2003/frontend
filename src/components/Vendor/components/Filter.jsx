import React, { useState, useEffect } from "react";

const Filter = ({ setAllVendorFiltered, allVendor, allVendorFiltered }) => {
  const [search, setSearch] = useState({
    vendor_name: "",
    vendor_email: "",
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
    var filteredData = await allVendor.filter(
      (item) =>
        item.vendor_name
          .toLowerCase()
          .includes(search.vendor_name.toLocaleLowerCase()) &&
        item.vendor_email.includes(search.vendor_email)
    );
    setAllVendorFiltered(filteredData);
    console.log("filtered contact", filteredData);
  };

  useEffect(() => {
    filteringFunction();
  }, [allVendor]);

  const submitForm = async (e) => {
    e.preventDefault();
    filteringFunction();
  };

  return (
    <>
      <div className="student-group-form">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name ..."
                onChange={insertFields}
                name="vendor_name"
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Email ..."
                onChange={insertFields}
                name="vendor_email"
              />
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
