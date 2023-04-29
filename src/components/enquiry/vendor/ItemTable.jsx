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
                  <strong className="customer-text-one">Invoice From</strong>
                  <h6 className="invoice-name">
                    AEGIS PROJECTS TECHNOLOGY PVT. LTD.
                  </h6>
                  <p className="invoice-details">
                    Office No 01,
                    <br />
                    Swami Samarth Building,
                    <br />
                    Opp. Sangrila Biscuits Company,
                    <br />
                    Next to Kala Udyog, LBS MARG,
                    <br />
                    Bhandup ( west),
                    <br />
                    Mumbai – 400078,
                    <br />
                    Maharashtra (INDIA)
                    <br />
                    <h6 className="invoice-name">
                      Issue Date: {new Date().toLocaleString()}
                    </h6>
                  </p>
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
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className="invoice-terms">
                <h6>Notes:</h6>
                <p className="mb-0">
                  Enter customer notes or any other details
                </p>
              </div>
              <div className="invoice-terms">
                <h6>Terms and Conditions:</h6>
                <p className="mb-0">
                  Enter customer notes or any other details
                </p>
              </div>
            </div>
          </div>
          <div className="invoice-sign text-end">
            <img
              className="img-fluid d-inline-block w-5"
              src="/sign.png"
              alt="sign"
            />
            <span className="d-block">Mr. Rajendra Maurya</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTable;
