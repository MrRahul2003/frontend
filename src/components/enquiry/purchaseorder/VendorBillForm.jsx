import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import "./UploadBtn.css";

// Api
import {
  addVendorBill,
  downloadVendorBill,
  getVendorBill,
} from "../../Api/PurchaseOrder";
import { getVendor } from "../../Api/Vendor";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const VendorBillForm = ({ quotationInfo, enquiryInfo }) => {
  const [Bill, setBill] = useState();

  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [allBills, setallBills] = useState([]);

  // --------------get all bills name and storing them in single array-------------------------------
  const getAllBillsData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
      quotation_id: quotationInfo._id,
    };

    const response = await getVendorBill(data);
    console.log("all bills", response.data);
    setallBills(response.data);
  };

  useEffect(() => {
    getAllBillsData();
  }, []);

  // on submitting the form sending the data to database using fetch api
  const submitForm = async (e) => {
    e.preventDefault();

    if (Bill === "") {
      Swal.fire("Enter all Details before procedding!");
    } else {
      const vendorbill_addingdate = new Date().toLocaleString();

      const getRandomName = () => {
        let rand = Date.now() + Math.floor(Math.random());
        console.log(Date.now(), Math.random());
        return rand;
      };

      var formdata = new FormData();
      formdata.append("employee_id", loginId);
      formdata.append("employee_email", email);

      formdata.append("uuid_id", getRandomName());
      formdata.append("quotation_id", quotationInfo._id);
      formdata.append("enquiry_id", enquiryInfo._id);
      formdata.append("vendor_id", quotationInfo.vendor_id);

      formdata.append("Bill", Bill);
      formdata.append("vendorbill_addingdate", vendorbill_addingdate);

      setLoading(true);
      const response = await addVendorBill(formdata, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setLoading(false);
      console.log(response.status);

      if (response.status === 200) {
        Swal.fire("Good job!", "Vendor bill added successfully!", "success");

        document.getElementById("addvendorbillform").reset();
        navigate(-1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  // ------------------------------downloadPdf-------------------------------
  const downloadPdf = async ({ billName, uuid_id }) => {
    console.log(billName, uuid_id);

    const dataFile = {
      employee_id: loginId,
      employee_email: email,
      billName: billName,
      uuid_id: uuid_id,
    };

    const { data } = await downloadVendorBill(dataFile);
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, "vendorbill.pdf");
  };

  // -------------------------------------------------------------------------

  return (
    <>
      <div className="content container-fluid">
        <div className="row mt-3">
          <form id="addvendorbillform">
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="form-group local-forms">
                  <div class="upload-btn-wrapper">
                    <button class="btn"></button>
                    <input
                      type="file"
                      name="bill"
                      placeholder="Upload Bill"
                      required
                      onChange={(e) => {
                        setBill(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="student-submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitForm}
                  disabled={loading}
                >
                  {loading ? <>Adding..</> : <>Add</>}
                </button>
              </div>
            </div>
          </form>
        </div>
        <br />
        <hr />
        <br />

        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">All Bills</h3>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Bill Name</th>
                        <th>ref no</th>
                        <th>quotation Id</th>
                        <th>Vendor Id</th>
                        <th>Bill addingDate</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBills.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.billName.slice(13)}</td>
                            <td>{item.uuid_id}</td>
                            <td>{item.quotation_id}</td>
                            <td>{item.vendor_id}</td>
                            <td>{item.vendorbill_addingdate}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  downloadPdf({
                                    billName: item.billName,
                                    uuid_id: item.uuid_id,
                                  })
                                }
                                disabled={loading}
                              >
                                {loading ? <>Downloading..</> : <>Download</>}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorBillForm;
