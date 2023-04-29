import React from "react";

const About = ({ enquiryInfo }) => {
  return (
    <>
      <div className="tab-pane fade show active" id="per_details_tab">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
                
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Enquiry Information</span>
                </h5>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Enquiry Name
                  </p>
                  <p className="col-sm-9">{enquiryInfo.enquiry_name}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Stage
                  </p>
                  <p className="col-sm-9">{enquiryInfo.enquiry_stage}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Contact Name
                  </p>
                  <p className="col-sm-9">{enquiryInfo.enquiry_contact_name}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Description
                  </p>
                  <p className="col-sm-9">{enquiryInfo.enquiry_description}</p>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Enquiry Items</span>
                </h5>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Make</th>
                        <th>Modal No</th>
                        <th>Part No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiryInfo.itemList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.item_name}</td>
                            <td>{item.item_make}</td>
                            <td>{item.item_modalNo}</td>
                            <td>{item.item_partNo}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
                    Enquiry Closing Date
                  </p>
                  <p className="col-sm-9">{enquiryInfo.enquiry_closingDate}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Last Modified on
                  </p>
                  <p className="col-sm-9">
                    {enquiryInfo.lastmodifydate}
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
