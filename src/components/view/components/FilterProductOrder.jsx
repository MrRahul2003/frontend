import React, { useState, useEffect } from "react";

const FilterProductOrder = ({AllProductOrder, setAllProductOrderFiltered}) => {
  const [search, setSearch] = useState({
    uuid_id: "",
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
    var filteredData = await AllProductOrder.filter((item) =>
      item.uuid_id.includes(search.uuid_id.toLocaleLowerCase())
    );
    setAllProductOrderFiltered(filteredData);
    console.log("filtered product order", filteredData);
  };

  useEffect(() => {
    filteringFunction();
  }, [AllProductOrder]);

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
                placeholder="Search by Ref No ..."
                onChange={insertFields}
                name="uuid_id"
              />
            </div>
          </div>
          {/* <div className="col-lg-5 col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Email ..."
                    onChange={insertFields}
                    name="company_email"
                  />
                </div>
              </div> */}
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

export default FilterProductOrder;
