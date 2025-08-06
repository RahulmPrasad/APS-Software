import React, { useEffect } from "react";
import "../css/styles.css";
import logo from "../assets/main-logo.png";
import userIcon from "../assets/user.png";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { useAuth0 } from "@auth0/auth0-react";


export default function ManMonthRegister() {
  const { logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {

    console.log("job-Register.js is running");
    const monthSelect = document.getElementById("month");
    if (monthSelect) {
      new Choices(monthSelect, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: "",
        placeholder: true,
        placeholderValue: "--Select Month--",
      });
    
    }

    const countrySelect = document.getElementById('country');
    if (countrySelect) {
    new Choices(countrySelect, {
      searchEnabled: true,
      itemSelectText: '',
      shouldSort: false,
    });
    }

    const numberOfDaysUnitSelect = document.getElementById('numberOfDaysUnit');
    if (numberOfDaysUnitSelect) {
    new Choices(numberOfDaysUnitSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false 
    });
    }

    const costCurrencySelect = document.getElementById('costCurrency');
    if (costCurrencySelect) {
    new Choices(costCurrencySelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false
    });
    }

    const offeredPriceCurrencySelect = document.getElementById('offeredPriceCurrency');
    if (offeredPriceCurrencySelect) {
    new Choices(offeredPriceCurrencySelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false
    });
    }

    const statusSelect = document.getElementById('status');
    if (statusSelect) {
    new Choices(statusSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false  
    });
    }

    const coordinatorSelect = document.getElementById('ownerCoordinator');
    if (coordinatorSelect) {
    new Choices(coordinatorSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false  
    });
    }

    // CALENDER FLATPICKR

    flatpickr("#inquiryDate", {
    dateFormat: "d-m-Y",
    altFormat: "F j, Y",
    allowInput: true,
    });

    flatpickr("#tentativeDate", {
    dateFormat: "d-m-Y",
    altFormat: "F j, Y",
    allowInput: true
    });


  // AUTH0

  // const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

  // if (isLoading) return <div>Loading...</div>;

  // if (!isAuthenticated) {
  //   loginWithRedirect();
  //   return null;
  // }

  // SUBMIT POPUP 


  const form = document.getElementById('myForm');
  const popup = document.getElementById('popup');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbz0iTIcrLWCozvz0kSBNTWEQ1VA6grQp1AJCXUP3OBLjL_BdCuQb9oxgWTp1f7Wccdt/exec', {
      method: 'POST',
      body: new URLSearchParams(formData)
    })
    .then(response => {
      if (response.ok) {
        popup.style.display = 'block';
        setTimeout(() => popup.style.opacity = '1', 10);
        setTimeout(() => {
          popup.style.opacity = '0';
          setTimeout(() => popup.style.display = 'none', 500);
        }, 5000);
        form.reset();
      } else {
        alert("Submission failed. Try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error submitting form.");
    });
  };

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  return () => {
    if (form) {
      form.removeEventListener('submit', handleSubmit);
    }
  };

    }

  , []);

return (
    <div className="inquiry-register">
      <input type="checkbox" id="nav-toggle" className="hidden" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="APS Logo" />
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="/" className="">
                <span className="material-symbols-outlined">person</span>
                <i>Inquiry Register</i>
              </a>
            </li>
            <li>
              <a href="/job-register">
                <span className="material-symbols-outlined">work</span>
                <i>Job Register</i>
              </a>
            </li>
            <li>
              <a href="/man-month" className="active">
                <span className="material-symbols-outlined">calendar_month</span>
                <i>Man Month Register</i>
              </a>
            </li>
            <li>
              <a href="/inspector-invoice">
                <span className="material-symbols-outlined">contract</span>
                <i>Inspector Invoice</i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <div className="header-title">
            <label htmlFor="nav-toggle">
              <span className="hamburger material-symbols-outlined">dehaze</span>
            </label>
            <h2>Man Month Register</h2>
          </div>
          <div className="user-wrapper">
            <img src={userIcon} alt="User" width="50" height="50" />
            <div>
              <h4>APS Group</h4>
              <small>Admin</small>
            </div>

            <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>

          </div>
        </header>

</div>
    </div>
  // }
  // </div>
  );
}