import React, { useState, useEffect } from "react";

const FilterQuotation = ({ AllQuotation, setAllQuotationFilter }) => {
  const [search, setSearch] = useState({
    enquiry_id: "",
    vendor_id: "",
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
    var filteredData = await AllQuotation.filter(
      (item) =>
        item.enquiry_id.includes(search.enquiry_id.toLocaleLowerCase()) &&
        item.vendor_id.includes(search.vendor_id.toLocaleLowerCase())
    );
    setAllQuotationFilter(filteredData);
    console.log("filtered product order", filteredData);
  };

  useEffect(() => {
    filteringFunction();
  }, [AllQuotation]);

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
                placeholder="Search by Enquiry No ..."
                onChange={insertFields}
                name="enquiry_id"
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Vendor Id ..."
                onChange={insertFields}
                name="vendor_id"
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

export default FilterQuotation;
