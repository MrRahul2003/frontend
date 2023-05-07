import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const Filter = ({ AllEnquiryFiltered, AllEnquiry, setAllEnquiryFiltered }) => {
  const [search, setSearch] = useState({
    enquiry_name: "",
    enquiry_stage: "",
    enquiry_closingDate: "",
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
    var filteredData = await AllEnquiry.filter(async (item) => {
      console.log(item);
      item.enquriy.enquiry_name
        .toLowerCase()
        .includes(search.enquiry_name.toLocaleLowerCase()) &&
        item.enquriy.enquiry_stage.includes(search.enquiry_stage) &&
        item.enquriy.enquiry_closingDate.includes(search.enquiry_closingDate);
    });
    // setAllEnquiryFiltered(filteredData);
    console.log("filtered enquiry", filteredData);
  };

  useEffect(() => {
    setAllEnquiryFiltered(AllEnquiry);
    filteringFunction();
  }, [AllEnquiry]);

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
                name="enquiry_name"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select
                className="form-control select"
                onChange={insertFields}
                name="enquiry_stage"
              >
                <option className="active" value="">
                  Chose the Stage below
                </option>
                <option value="Qualification">Qualification</option>
                <option value="Get Price Quotation">Get Price Quotation</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <Form.Control
                type="date"
                name="enquiry_closingDate"
                placeholder="DateRange"
                // value={date}
                onChange={insertFields}
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
