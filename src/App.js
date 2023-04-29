import React from "react";
import { Routes, Route } from "react-router-dom";

import Base from "./Base";

// products
import AddProducts from "./components/inventory/AddProducts";
import ShowProducts from "./components/inventory/ShowProducts";

// subproducts
import AddSubProducts from "./components/inventory/AddSubProducts";
import ShowSubProducts from "./components/inventory/ShowSubProducts";
import EditSubProduct from "./components/inventory/EditSubProduct";

// company
import AddCompany from "./components/companies/AddCompany";
import ShowCompanies from "./components/companies/ShowCompanies";
import EditContact from "./components/contacts/showcontacts/EditContact";

import CompanySections from "./components/companies/showcompany/CompanySections";

// contacts
import AddContacts from "./components/contacts/AddContacts";
import ShowContacts from "./components/contacts/ShowContacts";
import EditCompany from "./components/companies/showcompany/EditCompany";

import ContactSections from "./components/contacts/showcontacts/ContactSections";

// Enquiries - presales 
import AddEnquiry from "./components/contacts/enquiry/AddEnquiry";
import ShowEnquiry from "./components/contacts/enquiry/ShowEnquiry";

// vendor
import AddVendor from "./components/Vendor/AddVendor";
import ShowVendor from "./components/Vendor/ShowVendor";
import EditVendor from "./components/Vendor/showvendors/EditVendor";

import VendorSections from "./components/Vendor/showvendors/VendorSections";

// pipeline
import MainPipeline from "./components/pipeline/MainPipeline";
import ShowEnquiryItems from "./components/contacts/enquiry/ShowEnquiryItems";
import EditEnquiry from "./components/contacts/enquiry/EditEnquiry";

// enquiry -- sales
import ShowEnquirySales from "./components/enquiry/ShowEnquirySales";
import ShowEnquiryItemSales from "./components/enquiry/ShowEnquiryItemSales";
import EditEnquirySales from "./components/enquiry/EditEnquirySales";
import ShowVendorsSales from "./components/enquiry/vendor/ShowVendorsSales";

import EnquirySection from "./components/enquiry/EnquirySection";

// authentication
import Login from "./components/authentication/Login";
import Signin from "./components/authentication/Signin";
import Protected from "./components/private/Protected";
import AddQuotation from "./components/enquiry/quotation/AddQuotation";
import ShowQuotation from "./components/enquiry/quotation/ShowQuotation";
import EditQuotation from "./components/enquiry/quotation/EditQuotation";
import PurchaseOrder from "./components/enquiry/purchaseorder/PurchaseOrder";
import ProductOrder from "./components/enquiry/productorder/ProductOrder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route path="" element={<Protected Component={MainPipeline} />} />

        <Route path="/products">
          <Route path="addproducts" element={<Protected Component={AddProducts}  />} />
          <Route path="showproducts" element={<Protected Component={ShowProducts}  />} />
        </Route>

        <Route path="/subproducts">
          <Route path="addsubproducts" element={<Protected Component={AddSubProducts} />} />
          <Route path="showsubproducts" element={<Protected Component={ShowSubProducts} />} />
          <Route path="editsubproduct" element={<Protected Component={EditSubProduct} />} />
        </Route>

        <Route path="/contacts">
          <Route path="addcontacts" element={<Protected Component={AddContacts}   />} />
          <Route path="showcontacts" element={<Protected Component={ShowContacts}   />} />
          <Route path="editcontacts" element={<Protected Component={EditContact}   />} />

          <Route path="showcontacts/contactsection"
            element={<Protected Component={ContactSections}  />}
          />

          <Route
            path="showcontacts/contactsection/enquiryitem"
            element={<Protected Component={ContactSections}  />}
          />

          <Route path="enquiry/addenquiry" element={<Protected Component={AddEnquiry}  />} />
          <Route path="enquiry/showenquiry" element={<Protected Component={ShowEnquiry}  />} />
          <Route path="enquiry/editenquiry" element={<Protected Component={EditEnquiry}  />} />
          <Route path="enquiry/showenquiryitems" element={<Protected Component={ShowEnquiryItems}  />} />
        </Route>

        <Route path="/company">
          <Route path="addcompany" element={<Protected Component={AddCompany} />} />
          <Route path="showcompanies" element={<Protected Component={ShowCompanies} />} />
          <Route path="editcompany" element={<Protected Component={EditCompany} />} />

          <Route
            path="showcompanies/companysection"
            element={<Protected Component={CompanySections} />}
          />
        </Route>

        <Route path="/vendors">
          <Route path="addvendors" element={<Protected Component={AddVendor} />} />
          <Route path="showvendors" element={<Protected Component={ShowVendor} />} />
          <Route path="editvendors" element={<Protected Component={EditVendor} />} />

          <Route
            path="showvendors/vendorsection"
            element={<Protected Component={VendorSections} />}
          />
        </Route>

        <Route path="/enquirysales">
          <Route path="showenquiry" element={<Protected Component={ShowEnquirySales} />} />
          <Route path="editenquiry" element={<Protected Component={EditEnquirySales} />} />

          <Route path="showenquiryitemssales" element={<Protected Component={ShowEnquiryItemSales} />} />
          <Route path="showvendorssales" element={<Protected Component={ShowVendorsSales} />} />

          <Route path="enquirysection" element={<Protected Component={EnquirySection} />} />

          <Route path="addquotation" element={<Protected Component={AddQuotation} />} />
          <Route path="editquotation" element={<Protected Component={EditQuotation} />} />
          <Route path="showquotation" element={<Protected Component={ShowQuotation} />} />

          <Route path="purchaseorder" element={<Protected Component={PurchaseOrder} />} />

          <Route path="productorder" element={<Protected Component={ProductOrder} />} />
        </Route>

        <Route path="/authentication">
          <Route path="signin" element={<Signin/>} />
          <Route path="login" element={<Protected Component={Login} />} />
        </Route>

        <Route path="/pipeline" element={<Protected Component={MainPipeline} />} />

        <Route path="*" element={<Protected Component={MainPipeline} />} />
      </Route>
    </Routes>
  );
}

export default App;
