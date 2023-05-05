import React from "react";

const Pages = ({ companies, contacts, vendors }) => {
  return (
    <div className="row">

      <div className="col-xl-6 d-flex">
        <div className="card flex-fill comman-shadow">
          <div className="card-header d-flex align-items-center">
            <h5 className="card-title">Companies</h5>
            <hr />
          </div>
          <div className="card-body">
            <div className="activity-groups">
              {/* ------------------------------------------------------           */}

              {companies.map((item, i) => {
                return (
                  <>
                    <div className="activity-awards">
                      <div className="award-list-outs">
                        <h4>
                            {item.company_name}
                        </h4>
                        <h5>{item.company_email}</h5>
                      </div>
                      <div className="award-time-list">
                        <span>{item.company_addingdate}</span>
                      </div>
                    </div>
                  </>
                );
              })}

              {/* ------------------------------------------------------           */}
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6 d-flex">
        <div className="card flex-fill comman-shadow">
          <div className="card-header d-flex align-items-center">
            <h5 className="card-title">Contacts</h5>
            <hr />
          </div>
          <div className="card-body">
            <div className="activity-groups">
              {/* ------------------------------------------------------           */}

              {contacts.map((item, i) => {
                return (
                  <>
                    <div className="activity-awards">
                      <div className="award-list-outs">
                        <h4>
                            {item.contact_name}
                        </h4>
                        <h5>{item.contact_email}</h5>
                      </div>
                      <div className="award-time-list">
                        <span>{item.contact_addingdate}</span>
                      </div>
                    </div>
                  </>
                );
              })}

              {/* ------------------------------------------------------           */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Pages;
