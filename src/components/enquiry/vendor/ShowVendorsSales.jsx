import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import BreadCrumb from "../components/BreadCrumb";
import Filter from "../components/Filter";
import FormHeading from "../components/FormHeading";
import { LoginContext } from "../../context/LoginProvider";
import { getAllVendor } from "../../Api/Vendor";
import ItemTable from "./ItemTable";
import { genEnquiry, sendEnquiry } from "../../Api/Enquiry";

const ShowVendorsSales = () => {
  // ---------------------getting contact section info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  const [allVendor, setAllVendor] = useState([]);

  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  //  ---------------------fetching all vendors from database related to login user-------------------------
  const getAllVendorData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getAllVendor(data);
    console.log(response.data);
    setAllVendor(response.data);
  };

  useEffect(() => {
    getAllVendorData();
  }, []);
  // -----------------------------------------------------------------------------------------------------------
  // --------------------storing the checked values here-------------------------------------------------------
  const [isChecked, setIsChecked] = useState([]);
  const handleChange = (e) => {
    const { value, checked } = e.target;
    // alert(value, checked);

    setIsChecked((preVal) => {
      return [...preVal, value];
    });
  };
  // -----------------------------------------------------------------------------------------------------------

  const sendMailToVendor = async () => {
    const data = { receiver: isChecked, enquiryInfo: enquiryInfo };
    const response = await genEnquiry(data);
    console.log(response);

    if (response.status === 200) {
      alert("enquiry generated successfully");

      const res = await sendEnquiry(data);
      console.log(res);
      if (response.status === 200) {
        alert("mail send successfully");
      } else {
        alert("invalid credentials");
      }
    } else {
      alert("invalid credentials");
    }
  };

  // ------------------------csv data--------------------------------------------------------------
  const csv_file = [];

  for (const i in enquiryInfo.itemList) {
    const obj = {
      id: i,
      item_name: enquiryInfo.itemList[i].item_name,
      item_make: enquiryInfo.itemList[i].item_make,
      item_modalNo: enquiryInfo.itemList[i].item_modalNo,
      item_partNo: enquiryInfo.itemList[i].item_partNo,
    };
    csv_file.push(obj);
  }

  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <ItemTable enquiryInfo={enquiryInfo} />
              <div class="modal-footer">
                <div class="bank-details-btn">
                  <NavLink
                    to="/enquirysales/showenquiry"
                    className="btn bank-cancel-btn me-2"
                  >
                    Cancel
                  </NavLink>
                  <button
                    className="btn bank-cancel-btn me-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    Send To Vendors
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Vendors List</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div className="table-responsive">
                <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                  <thead className="student-thread">
                    <tr>
                      <th>
                        {/* <div class="form-check check-tables">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="allselect"
                            onChange={handleChange}
                            checked={
                              !allVendor.some((user) => {
                                user?.isChecked !== true;
                              })
                            }
                          />
                        </div> */}
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allVendor.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <div class="form-check check-tables">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={item.vendor_email}
                                onChange={handleChange}
                                checked={item.isChecked}
                              />
                            </div>
                          </td>
                          <td>{item.vendor_name}</td>
                          <td>{item.vendor_email}</td>
                        </tr>
                      );
                    })}
                    <button
                      className="btn btn-primary my-4"
                      type="button"
                      onClick={sendMailToVendor}
                    >
                      Send Mail
                    </button>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowVendorsSales;
