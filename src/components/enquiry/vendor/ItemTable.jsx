import React from "react";

const ItemTable = ({ enquiryInfo }) => {
  return (
    <>
      <div className="card invoice-info-card">
        <div className="card-body">
          <div className="invoice-item invoice-item-one">
            <div className="row">
              <div className="col-md-6">
                <div className="invoice-logo">
                  <img src="/logo.jpeg" alt="logo" />
                </div>
                <div className="invoice-head">
                  <h2>AEGIS PROJECTS TECHNOLOGY PVT. LTD.</h2>
                  {/* <p>Invoice Number : In983248782</p> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="invoice-info">
                  <strong className="customer-text-one">Enquiry Form</strong>
                  <h6 className="invoice-name">
                    AEGIS PROJECTS TECHNOLOGY PVT. LTD.
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-item invoice-table-wrap">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="invoice-table table table-center mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Make</th>
                        <th>Modal No</th>
                        <th>Part Name</th>
                        <th>Part No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiryInfo.itemList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.item_make}</td>
                            <td>{item.item_modalNo}</td>
                            <td>{item.item_name}</td>
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
          <div className="invoice-sign text-end">
            <span className="d-block">Mr. Rajendra Maurya</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTable;
