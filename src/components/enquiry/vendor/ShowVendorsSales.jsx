import React, { useEffect, useState } from "react";
import { NavLink, useLocation,useNavigate } from "react-router-dom";

// components
import ItemTable from "./ItemTable";

// api
import { getAllVendor } from "../../Api/Vendor";
import { genEnquiry, sendEnquiry } from "../../Api/Enquiry";

// sweet alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ShowVendorsSales = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // ---------------------getting enquiry info from navlink--------------------------------
  let location = useLocation();
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const enquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  const [allVendor, setAllVendor] = useState([]);

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
      Swal.fire({
        title: "Enquiry has been generated?",
        text: "Do you wish to send it on Mail to vendors!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await sendEnquiry(data);
          console.log(res.data);

          if (res.status === 200) {
            Swal.fire("Sent!", "Your Enquiry has been sent.", "success");
            navigate("/enquirysales/showenquiry");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
                      <th></th>
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
