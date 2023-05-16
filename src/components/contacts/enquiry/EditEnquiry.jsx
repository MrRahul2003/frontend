import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

// components
import AllItemList from "./AllItemList";
import FormHeading from "../components/FormHeading";
import BreadCrumb from "../components/BreadCrumb";

// Api
import { editEnquiry } from "../../Api/Enquiry";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditEnquiry = () => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  // ---------------------getting contact and enquiry info from navlink--------------------------------
  let location = useLocation();
  console.log("Contact information is: ", location.state.contactInfo);
  const contactInfo = location.state.contactInfo;
  console.log("Enquiry information is: ", location.state.enquiryInfo);
  const EnquiryInfo = location.state.enquiryInfo;
  // ---------------------------------------------------------------------------------------

  const loginId = localStorage.getItem("loginId");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // ---------------When the page loads enquiryInfo and ItemList is updated---------------------------------------------

  const [enquiryInfo, setenquiryInfo] = useState({});
  const [ItemList, setItemList] = useState([]);

  useEffect(() => {
    setenquiryInfo({
      enquiry_name: EnquiryInfo.enquiry_name,
      enquiry_contact_name: EnquiryInfo.enquiry_contact_name,
      enquiry_stage: EnquiryInfo.enquiry_stage,
      enquiry_closingDate: EnquiryInfo.enquiry_closingDate,
      enquiry_description: EnquiryInfo.enquiry_description,
    });
    setItemList(EnquiryInfo.itemList);
  }, []);

  // updating the edit enquiry form data on changing the values
  const insertFields = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setenquiryInfo((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  // -----------------------------------------------------------------------------------------------

  // ---------------------------storing items in enquiry data when user add it on form-------------------------------
  const [itemInfo, setItemInfo] = useState({
    item_name: "",
    item_make: "",
    item_modalNo: "",
    item_partNo: "",
  });

  const insertItems = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setItemInfo((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const AddItemList = () => {
    setItemList((preVal) => {
      return [...preVal, itemInfo];
    });

    setItemInfo({
      item_name: "",
      item_make: "",
      item_modalNo: "",
      item_partNo: "",
    });
  };
  // -----------------------------------------------------------------------------------------------
  // on submitting the form sending the data to database using axios api
  const submitForm = async (e) => {
    e.preventDefault();

    if (
      enquiryInfo.enquiry_name === "" ||
      enquiryInfo.enquiry_stage === "" ||
      itemInfo.item_name !== "" ||
      itemInfo.item_make !== "" ||
      itemInfo.item_modalNo !== "" ||
      itemInfo.item_partNo !== ""
    ) {
      Swal.fire("Enter all Details or add item to list before procedding!");
    } else {
      const data = {
        employee_id: loginId,
        employee_email: email,
        enquiry_contact_id: contactInfo._id,
        enquiry_contact_name: contactInfo.contact_name,

        enquiry_id: EnquiryInfo._id,
        enquiry_name: enquiryInfo.enquiry_name,
        enquiry_stage: enquiryInfo.enquiry_stage,
        enquiry_closingDate: enquiryInfo.enquiry_closingDate,
        enquiry_addingdate: enquiryInfo.enquiry_addingdate,
        enquiry_description: enquiryInfo.enquiry_description,

        itemList: ItemList,
      };

      setLoading(true);
      const response = await editEnquiry(data);
      setLoading(false);
      console.log(response);

      if (response.status === 200) {
        Swal.fire("Good job!", "Changes made successfully!", "success");
        document.getElementById("editenquiryform").reset();
        navigate("/contacts/showcontacts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  // --------------------------deleting the items befor submitting the form----------------------------------------
  const deleteItem = (id) => {
    console.log(id);

    setItemList((preVal) => {
      return preVal.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };
  // -----------------------------------------------------------------------------------------------

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <BreadCrumb title="Edit Enquiry" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card comman-shadow">
                <div className="card-body">
                  <form id="editenquiryform">
                    <div className="row">
                      <FormHeading title="Enquiry Information" />

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Enquiry Name
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            onChange={insertFields}
                            value={enquiryInfo.enquiry_name}
                            name="enquiry_name"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Stage <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control select"
                            onChange={insertFields}
                            value={enquiryInfo.enquiry_stage}
                            name="enquiry_stage"
                          >
                            <option className="active" value="">
                              Chose the Stage below
                            </option>
                            <option value="Qualification">Qualification</option>
                            <option value="Get Price Quotation">
                              Get Price Quotation
                            </option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Closing Date <span className="login-danger">*</span>
                          </label>
                          <Form.Control
                            type="date"
                            name="enquiry_closingDate"
                            placeholder="DateRange"
                            value={enquiryInfo.enquiry_closingDate}
                            onChange={insertFields}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>Description</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertFields}
                            value={enquiryInfo.enquiry_description}
                            name="enquiry_description"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <div className="col-12 d-flex">
                          <h5 className="form-title student-info">
                            Enquiry Items
                          </h5>
                        </div>
                      </div>

                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>Name</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertItems}
                            value={itemInfo.item_name}
                            name="item_name"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>Make</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertItems}
                            value={itemInfo.item_make}
                            name="item_make"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-2">
                        <div className="form-group local-forms">
                          <label>Modal No.</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertItems}
                            value={itemInfo.item_modalNo}
                            name="item_modalNo"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-2">
                        <div className="form-group local-forms">
                          <label>Part No.</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={insertItems}
                            value={itemInfo.item_partNo}
                            name="item_partNo"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-2">
                        <div className="form-group local-forms">
                          <a className="btn btn-primary" onClick={AddItemList}>
                            <i className="fas fa-plus" />
                          </a>
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
                          {loading ? <>Updating..</> : <>Update</>}
                        </button>
                      </div>
                    </div>
                  </form>
                  <AllItemList deleteItem={deleteItem} ItemList={ItemList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEnquiry;
