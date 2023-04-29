import React from "react";

const About = ({ companyInfo }) => {
  return (
    <>
      <div className="tab-pane fade show active" id="per_details_tab">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Company Information</span>
                </h5>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Name
                  </p>
                  <p className="col-sm-9">{companyInfo.company_name}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Phone
                  </p>
                  <p className="col-sm-9">{companyInfo.company_phone}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Email ID
                  </p>
                  <p className="col-sm-9">{companyInfo.company_email}</p>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Address Information</span>
                </h5>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Street
                  </p>
                  <p className="col-sm-9">{companyInfo.company_street}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    City
                  </p>
                  <p className="col-sm-9">{companyInfo.company_city}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    State
                  </p>
                  <p className="col-sm-9">{companyInfo.company_state}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Country
                  </p>
                  <p className="col-sm-9">{companyInfo.company_country}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Code
                  </p>
                  <p className="col-sm-9">{companyInfo.company_code}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Account Status</span>
                </h5>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Added on
                  </p>
                  <p className="col-sm-9">{companyInfo.company_addingdate}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Last Modified on
                  </p>
                  <p className="col-sm-9">
                    {companyInfo.lastmodifydate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
