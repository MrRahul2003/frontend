import React from 'react'

const About = ({vendorInfo}) => {
  return (
    <>
      <div className="tab-pane fade show active" id="per_details_tab">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Vendor Information</span>
                </h5>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Name
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_name}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Phone1
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_phone1}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Phone2
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_phone2}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Email ID
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_email}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Title
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_title}</p>
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
                  <p className="col-sm-9">{vendorInfo.vendor_street}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    City
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_city}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    State
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_state}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Country
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_country}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Code
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_code}</p>
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
                    Contacts
                  </p>
                  <p className="col-sm-9">3</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Added on
                  </p>
                  <p className="col-sm-9">{vendorInfo.vendor_addingdate}</p>
                </div>

                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                    Last Modified on
                  </p>
                  <p className="col-sm-9">
                    {vendorInfo.lastmodifydate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About