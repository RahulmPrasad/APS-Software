import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import  InquiryRegister from "../src/pages/InquiryRegister";
import JobRegister from "../src/pages/JobRegister";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/styles.css";
import InspectorInvoice from "./pages/InspectorInvoice";
import ManMonthRegister from "./pages/ManMonthRegister";

export default function App() {

    const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: 20 }}>Loading...</p>
      </div>
    );
   }

    if (!isAuthenticated) {
    loginWithRedirect();
    return null;
    }


// file for login 

return (
    <div>
    {
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<InquiryRegister />} />
        <Route path="/job-register" element={<JobRegister />} /> 
        <Route path="/inspector-invoice" element={<InspectorInvoice />} />
        <Route path="/man-month" element={<ManMonthRegister />} />
       </Routes>
      </BrowserRouter>
    }
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    backgroundColor: "#f9f9f9"
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "6px solid #ccc",
    borderTop: "6px solid #202654",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};

