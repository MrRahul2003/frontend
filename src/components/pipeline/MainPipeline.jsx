import React, { useState, useEffect, useContext } from "react";

// components
import Numbers from "./components/Numbers";

// Api
import { getPipelineEnquiry } from "../Api/Enquiry";

// context hooks
import { LoginContext } from "../context/LoginProvider";

const MainPipeline = () => {
  // const { email, loginId } = useContext(LoginContext);
  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");

  const [AllEnquiry, setAllEnquiry] = useState([]);

  // --------------get all contact enquiry and storing them in single array-------------------------------

  const getAllEnquiryData = async () => {
    const data = {
      employee_id: loginId,
      employee_email: email,
    };

    const response = await getPipelineEnquiry(data);
    console.log("all enquiry pipeline", response.data);

    for (var i in response.data) {
      console.log(response.data[i].enquiry);
      var enquiriesData = response.data[i].enquiry;
      for (var i in enquiriesData) {
        console.log(enquiriesData[i]);
        setAllEnquiry((preVal) => {
          return [...preVal, enquiriesData[i]];
        });
      }
    }
  };

  useEffect(() => {
    getAllEnquiryData();
  }, []);
  // --------------------------------------------------------------------------------------------------

  const displayProgress = (stage) => {
    console.log(stage);
    if (stage === "Qualification") {
      return 20;
    } else if (stage === "Get Price Quotation") {
      return 40;
    } else if (stage === "Negotiation") {
      return 60;
    } else if (stage === "Won") {
      return 80;
    } else if (stage === "Lost") {
      return 80;
    }
    return 100;
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Welcome {email}!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Admin</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Numbers />

        <div className="row">
          <div className="col-xl-12 d-flex">
            <div className="card flex-fill student-space comman-shadow">
              <div className="card-header d-flex align-items-center">
                <h5 className="card-title">All Enquiries</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>ID</th>
                        <th>Enquiry Name</th>
                        <th>Stage</th>
                        <th>Enquiry Item</th>
                        <th>Contact Name</th>
                        <th>Closing Date</th>
                        <th>Adding Date</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllEnquiry.map((item, i) => {
                        var valueProgress = displayProgress(
                          item.enquiry_stage
                        )
                        console.log(valueProgress);
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <h2>{item.enquiry_name}</h2>
                            </td>
                            <td>
                              <div className="progress progress-sm">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: valueProgress }}
                                  aria-valuenow={valueProgress}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </td>
                            <td>{item.itemList.length}</td>
                            <td>{item.enquiry_contact_name}</td>
                            <td>{item.enquiry_closingDate}</td>
                            <td>{item.enquiry_addingdate}</td>
                            <td>{item.enquiry_description}</td>
                            <td className="text-start"></td>
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
    </div>
  );
};

export default MainPipeline;
