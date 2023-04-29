import React, { useState, createContext } from "react";

export const LoginContext = createContext(null);

const LoginProvider = ({ children }) => {
  // storing login user email and id
  const [email, setemail] = useState("");
  const [loginId, setloginId] = useState("");
  const [username, setusername] = useState("");

  // storing view enquiry details
  const [enquiryItem, setenquiryItem] = useState({});
  const [showItemState, setShowItemState] = useState(false);

  // storing edit enquiry details
  const [display, setDisplay] = useState("none"); // display edit enquiry page
  const [updateStatus, setUpdateStatus] = useState(false);

  return (
    <>
      <LoginContext.Provider
        value={{
          email,
          setemail,
          loginId,
          setloginId,
          enquiryItem,
          setenquiryItem,
          showItemState,
          setShowItemState,
          display,
          setDisplay,
          username,
          setusername,
          updateStatus, setUpdateStatus
        }}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default LoginProvider;
