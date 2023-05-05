import React, { useState, useEffect } from "react";

const Filter = ({ allCompanies, setAllCompaniesFiltered }) => {
  const [search, setSearch] = useState({
    company_name: "",
    company_email: "",
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
    var filteredData = await allCompanies.filter(
      (item) =>
        item.company_name
          .toLowerCase()
          .includes(search.company_name.toLocaleLowerCase()) &&
        item.company_email.includes(search.company_email)
    );
    setAllCompaniesFiltered(filteredData);
    console.log("filtered contact", filteredData);
  };

  useEffect(() => {
    filteringFunction();
  }, [allCompanies]);

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
                name="company_name"
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
                name="company_email"
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
