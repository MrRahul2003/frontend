import React from "react";

const quotationcustomer = () => {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-6 mx-4">
              <div className="card invoice-info-card">
                <div className="card-body">
                  <div className="invoice-item invoice-item-one">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="invoice-logo">
                          <img src="/logo.jpeg" alt="logo" />
                        </div>
                        <div className="invoice-head">
                          <h2>AEGIS PROJECTS TECHNOLOGY PVT. LTD</h2>
                          <p>Reference No : - AEGIS/MPL/2726/03/2022-23</p>
                          <p>Date : - 24/03/2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="invoice-item invoice-item-two">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="invoice-info">
                          <strong className="customer-text-one">
                            To, <br />
                            M/S. LUBE OIL COMPANY
                          </strong>
                          <p className="invoice-details invoice-details-two">
                            Address line 1, <br />
                            Address line 2 <br />
                            Zip code ,City - Country
                          </p>
                          <h6 className="invoice-name my-3">
                            MOBILE NO : - +91- 07038456772
                          </h6>
                          <h6 className="invoice-name my-3">
                            E mail ID :- badrinath.naikwadi@megafine.in
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-10">
                        <div className="invoice-info">
                          <strong className="customer-text-one">
                            DELIVERY ADDRESS:-
                          </strong>
                          <p className="invoice-details invoice-details-two">
                            Address line 1, <br />
                            Address line 2 <br />
                            Zip code ,City - Country
                          </p>
                          <h6 className="invoice-name my-3">
                            Cell – 9820329458 / 9820229458
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="invoice-item invoice-table-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <strong className="customer-text-one">
                            A. PURCHASE ORDER: - AEGIS/LUBE OIL/900/03/2022-23
                            <h5>GST NO. 27AAHCA3261B1Z4</h5>
                          </strong>
                          <table className="invoice-table table table-center mb-0">
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Make</th>
                                <th>Modal No</th>
                                <th>Part Name</th>
                                <th>Part No</th>
                                <th>HSN Code</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th className="text-end">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Dell Laptop</td>
                                <td>Laptop</td>
                                <td>$1,110</td>
                                <th>2</th>
                                <th>2%</th>
                                <td className="text-end">$400</td>
                              </tr>
                              <tr>
                                <td>HP Laptop</td>
                                <td>Laptop</td>
                                <td>$1,500</td>
                                <th>3</th>
                                <th>6%</th>
                                <td className="text-end">$3,000</td>
                              </tr>
                              <tr>
                                <td>Apple Ipad</td>
                                <td>Ipad</td>
                                <td>$11,500</td>
                                <th>1</th>
                                <th>10%</th>
                                <td className="text-end">$11,000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="invoice-total-card">
                        <div className="invoice-total-box">
                          <div className="invoice-total-inner">
                            <p className="mb-0">
                              Sub total <span>$3,300.00</span>
                            </p>
                          </div>
                          <div className="invoice-total-footer">
                            <h4>
                              Total Amount <span>$143,300.00</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -----------------------------isko change mat karo--------------------------- */}
                  <hr />
                  <div className="invoice-item invoice-table-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <strong className="customer-text-one">
                            B. COMMERCIAL TERMS & CONDITIONS.
                          </strong>
                          <table className="invoice-table table table-center mb-0">
                            <tbody>
                              <tr>
                                <td>01</td>
                                <td>DELIVERY PERIOD </td>
                                <td>AGAINST PO</td>
                              </tr>
                              <tr>
                                <td>02</td>
                                <td>PACKAGING </td>
                                <td>NIL</td>
                              </tr>
                              <tr>
                                <td>03</td>
                                <td>PAYMENTS TERMS </td>
                                <td>AGAINST PROFORMA INVOICE</td>
                              </tr>
                              <tr>
                                <td>04</td>
                                <td>TRANSPORT CHARGES </td>
                                <td>ON PARTY’S ACCOUNT </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <hr />
                      <div className="col-md-12">
                        <div className="invoice-info">
                          <p className="invoice-details invoice-details-two">
                            <h6 className="invoice-name">
                              THANKS & REGARDS,
                              <br />
                            </h6>
                            <br />
                            <h6 className="invoice-name">
                              AEGIS Projects Technology Pvt Ltd <br />
                            </h6>
                            <p className="invoice-details invoice-details-two">
                              AMRUTA PEDNEKAR <br />
                              ACCOUNT/ OPERATION <br />
                              TEL NO.: +912225663611 / +912225663612 <br />
                              EXT.NO: - 33 <br />
                              FAX : +912225663613 <br />
                              <h6 className="invoice-name my-3">
                                E MAIL: - projects@aegisptech.com <br />
                                WEB: www.aegisptech.com <br />
                              </h6>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ----------------------------------------------------------------------------- */}
                  {/* -----------------------------isko change mat karo--------------------------- */}
                  <hr />
                  <div className="invoice-item invoice-table-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <strong className="customer-text-one">
                            C. PARTY MASTER FORM
                          </strong>
                          <h6 className="invoice-name">
                            CIN NO. : U74999MH2008PTC186812
                          </h6>
                          <h6 className="invoice-name">
                            Dear Sir, <br />
                            As required by you, please find hereunder details to
                            be submitted by us for laying out Party Master
                            against Vendor registration
                          </h6>
                          <table className="invoice-table table table-center mb-0">
                            <tbody>
                              <tr>
                                <td>Party Name </td>
                                <td>AEGIS Projects Technology Pvt Ltd</td>
                              </tr>
                              <tr>
                                <td>Party Status </td>
                                <td>Creditors</td>
                              </tr>
                              <tr>
                                <td>Account Type </td>
                                <td>Local</td>
                              </tr>
                              <tr>
                                <td>Account Group</td>
                                <td>
                                  AEGIS Projects Technology Pvt Ltd – Mumbai
                                  Office No – 01 , Swami Samarth Bldg – Next
                                  Kala Udyog , LBS Marg, Bhandup (w) Mumbai –
                                  400078 , Maharashtra
                                </td>
                              </tr>
                              <tr>
                                <td>Address </td>
                                <td>India</td>
                              </tr>
                              <tr>
                                <td>City </td>
                                <td>Mumbai ,Maharashtra </td>
                              </tr>
                              <tr>
                                <td>Pin Code </td>
                                <td>400078 </td>
                              </tr>
                              <tr>
                                <td>Country </td>
                                <td>India </td>
                              </tr>
                              <tr>
                                <td>Telephone No </td>
                                <td>022-25663611, 022-25663612 </td>
                              </tr>
                              <tr>
                                <td>Fax No. </td>
                                <td>: 022- 25663613 </td>
                              </tr>
                              <tr>
                                <td>Contact Person </td>
                                <td>Mr. Rajendra Maurya </td>
                              </tr>
                              <tr>
                                <td>Local Sales Tax No </td>
                                <td>27240756610 V</td>
                              </tr>
                              <tr>
                                <td>L.S.T. Date </td>
                                <td> </td>
                              </tr>
                              <tr>
                                <td>Central Sales Tax No </td>
                                <td>27240756610 C </td>
                              </tr>
                              <tr>
                                <td>C.S.T. Date </td>
                                <td> </td>
                              </tr>
                              <tr>
                                <td>Work Contract Tax No ,S Tax </td>
                                <td>AAHCA3261BSD001</td>
                              </tr>
                              <tr>
                                <td>Central Excise Code No</td>
                                <td>AAHCA 3261 BED 001</td>
                              </tr>
                              <tr>
                                <td>Excise Range</td>
                                <td>IV</td>
                              </tr>
                              <tr>
                                <td>Excise Division</td>
                                <td>DIV- BHANDUP MUMBAI -III</td>
                              </tr>
                              <tr>
                                <td>Income Tax PAN No.</td>
                                <td>AAHCA3261B</td>
                              </tr>
                              <tr>
                                <td>IE Code No.</td>
                                <td>0311020933</td>
                              </tr>
                              <tr>
                                <td>TAN No.</td>
                                <td>PNEA14471C</td>
                              </tr>
                              <tr>
                                <td>Currency</td>
                                <td>INR</td>
                              </tr>
                              <tr>
                                <td>Bank Name</td>
                                <td>INDIAN BANK </td>
                              </tr>
                              <tr>
                                <td>Branch</td>
                                <td>HIRANANDANI THANE WEST </td>
                              </tr>
                              <tr>
                                <td>Bank account type & No.</td>
                                <td>Current – 6114353375</td>
                              </tr>
                              <tr>
                                <td>IFSC Code No</td>
                                <td>IDIB000T129</td>
                              </tr>
                              <tr>
                                <td>Payment Terms</td>
                                <td>As per Terms & condition</td>
                              </tr>
                              <tr>
                                <td>SSI Unit </td>
                                <td>N.A</td>
                              </tr>
                              <tr>
                                <td>TDS </td>
                                <td>N.A</td>
                              </tr>
                              <tr>
                                <td>ARN NO.</td>
                                <td>AA270417020312O</td>
                              </tr>
                              <tr>
                                <td>GST ID NUMBER</td>
                                <td>27AAHCA3261B1Z4</td>
                              </tr>
                              <tr>
                                <td>Authorised Signatory </td>
                                <td>Rajendra Maurya -09820229458</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ----------------------------------------------------------------------------- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default quotationcustomer;
