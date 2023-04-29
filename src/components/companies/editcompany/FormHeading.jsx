import React from "react";

const FormHeading = (props) => {
  return (
    <>
      <div className="col-12">
        <h5 className="form-title student-info">{props.title}</h5>
      </div>
    </>
  );
};

export default FormHeading;
