import React from "react";

const BreadCrumb = (props) => {
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{props.title}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">{props.title}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
