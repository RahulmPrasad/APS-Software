import React, { useEffect } from "react";
import "../css/styles.css";
import logo from "../assets/main-logo.png";
import userIcon from "../assets/user.png";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Choices from "choices.js";
import { useAuth0 } from "@auth0/auth0-react";
import "choices.js/public/assets/styles/choices.min.css";

export default function JobRegister() {

  const { logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
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

    const numberOfDaysUnitSelect = document.getElementById('numberOfDaysUnit');
    if (numberOfDaysUnitSelect) {
    new Choices(numberOfDaysUnitSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false 
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

    const inspectorCurrencySelect = document.getElementById('inspectorRateCurrency');
    if (inspectorCurrencySelect) {
    new Choices(inspectorCurrencySelect, {
      searchEnabled: true,
      itemSelectText: '',
      shouldSort: false,
    });
    }

    const offerCurrencySelect = document.getElementById('offeredRateCurrency');
    if (offerCurrencySelect) {
    new Choices(offerCurrencySelect, {
      searchEnabled: true,
      itemSelectText: '',
      shouldSort: false,
    });
    }

    const ownerSelect = document.getElementById('ownerCoordinator');
    if (ownerSelect) {
    new Choices(ownerSelect, {
      searchEnabled: true,
      itemSelectText: '',
      shouldSort: false,
    });
    }


    // FLATPICKR CALENDER
        
    flatpickr("#startOfInspection", {
    mode: "multiple",
    dateFormat: "d-m-Y"
    });

    flatpickr("#reportRecieved", {
    dateFormat: "d-m-Y", 
    altFormat: "F j, Y",
    allowInput: true
    });

    flatpickr("#reportSubmitted", {
    dateFormat: "d-m-Y", 
    altFormat: "F j, Y",
    allowInput: true
    });

       
    // SUBMIT POPUP 


  const form = document.getElementById('myForm');
  const popup = document.getElementById('popup');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbxMmF8sRTyfqtRdxFWi6v3CorZBe9YLwATsQksJxyVH9bO8evQEN-6sfdQ4gmrDV6bO/exec', {
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


  }, []);

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
              <a href="/">
                <span className="material-symbols-outlined">person</span>
                <i>Inquiry Register</i>
              </a>
            </li>
            <li>
              <a className="active" href="/job-register">
                <span className="material-symbols-outlined">work</span>
                <i>Job Register</i>
              </a>
            </li>
            <li>
              <a href="/man-month">
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
            <h2>Job Register</h2>
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

        <main>
          <div className="form-container">
            <form
              id="myForm"
              autoComplete="off"
              action="https://script.google.com/macros/s/AKfycbxMmF8sRTyfqtRdxFWi6v3CorZBe9YLwATsQksJxyVH9bO8evQEN-6sfdQ4gmrDV6bO/exec"
              method="POST"
            >
              <input type="hidden" name="formType" value="job" />

            <div className="form-wrapper">

             <div className="form-section">
              
               <div className="form-group">
                <label htmlFor="jobNumber">Job Number</label>
                <input type="text" id="jobNumber" name="JobNumber" required />
              </div>

              <div class="form-group">
                <label htmlFor="project">Project</label>
                <input type="text" id="project" name="Project" required />
              </div>

              <div class="form-group">
                <label htmlFor="inqSource">Inq Source</label>
                <input type="text" id="inqSource" name="InqSource" required />
              </div>

             </div>

             <div className="form-section">

              <div className="form-group">
                <label htmlFor="client">Client</label>
                <input type="text" id="client" name="Client" required />
              </div>

              <div className="form-group">
                <label htmlFor="vendor">Vendor</label>
                <input type="text" id="vendor" name="Vendor" required />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="Location" required />
              </div>

             </div>

              <div className="form-section">

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" name="Country" required>
  <option value="">--Select Country--</option>
  <option value="Afghanistan">Afghanistan</option>
  <option value="Albania">Albania</option>
  <option value="Algeria">Algeria</option>
  <option value="Andorra">Andorra</option>
  <option value="Angola">Angola</option>
  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
  <option value="Argentina">Argentina</option>
  <option value="Armenia">Armenia</option>
  <option value="Australia">Australia</option>
  <option value="Austria">Austria</option>
  <option value="Azerbaijan">Azerbaijan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahrain">Bahrain</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbados">Barbados</option>
  <option value="Belarus">Belarus</option>
  <option value="Belgium">Belgium</option>
  <option value="Belize">Belize</option>
  <option value="Benin">Benin</option>
  <option value="Bhutan">Bhutan</option>
  <option value="Bolivia">Bolivia</option>
  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
  <option value="Botswana">Botswana</option>
  <option value="Brazil">Brazil</option>
  <option value="Brunei">Brunei</option>
  <option value="Bulgaria">Bulgaria</option>
  <option value="Burkina Faso">Burkina Faso</option>
  <option value="Burundi">Burundi</option>
  <option value="Cabo Verde">Cabo Verde</option>
  <option value="Cambodia">Cambodia</option>
  <option value="Cameroon">Cameroon</option>
  <option value="Canada">Canada</option>
  <option value="Central African Republic">Central African Republic</option>
  <option value="Chad">Chad</option>
  <option value="Chile">Chile</option>
  <option value="China">China</option>
  <option value="Colombia">Colombia</option>
  <option value="Comoros">Comoros</option>
  <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Croatia">Croatia</option>
  <option value="Cuba">Cuba</option>
  <option value="Cyprus">Cyprus</option>
  <option value="Czech Republic">Czech Republic</option>
  <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
  <option value="Denmark">Denmark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominica">Dominica</option>
  <option value="Dominican Republic">Dominican Republic</option>
  <option value="Ecuador">Ecuador</option>
  <option value="Egypt">Egypt</option>
  <option value="El Salvador">El Salvador</option>
  <option value="Equatorial Guinea">Equatorial Guinea</option>
  <option value="Eritrea">Eritrea</option>
  <option value="Estonia">Estonia</option>
  <option value="Eswatini">Eswatini</option>
  <option value="Ethiopia">Ethiopia</option>
  <option value="Fiji">Fiji</option>
  <option value="Finland">Finland</option>
  <option value="France">France</option>
  <option value="Gabon">Gabon</option>
  <option value="Gambia">Gambia</option>
  <option value="Georgia">Georgia</option>
  <option value="Germany">Germany</option>
  <option value="Ghana">Ghana</option>
  <option value="Greece">Greece</option>
  <option value="Grenada">Grenada</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guinea">Guinea</option>
  <option value="Guinea-Bissau">Guinea-Bissau</option>
  <option value="Guyana">Guyana</option>
  <option value="Haiti">Haiti</option>
  <option value="Honduras">Honduras</option>
  <option value="Hungary">Hungary</option>
  <option value="Iceland">Iceland</option>
  <option value="India">India</option>
  <option value="Indonesia">Indonesia</option>
  <option value="Iran">Iran</option>
  <option value="Iraq">Iraq</option>
  <option value="Ireland">Ireland</option>
  <option value="Israel">Israel</option>
  <option value="Italy">Italy</option>
  <option value="Ivory Coast">Ivory Coast</option>
  <option value="Jamaica">Jamaica</option>
  <option value="Japan">Japan</option>
  <option value="Jordan">Jordan</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Kuwait">Kuwait</option>
  <option value="Kyrgyzstan">Kyrgyzstan</option>
  <option value="Laos">Laos</option>
  <option value="Latvia">Latvia</option>
  <option value="Lebanon">Lebanon</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Liberia">Liberia</option>
  <option value="Libya">Libya</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lithuania">Lithuania</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malawi">Malawi</option>
  <option value="Malaysia">Malaysia</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malta">Malta</option>
  <option value="Marshall Islands">Marshall Islands</option>
  <option value="Mauritania">Mauritania</option>
  <option value="Mauritius">Mauritius</option>
  <option value="Mexico">Mexico</option>
  <option value="Micronesia">Micronesia</option>
  <option value="Moldova">Moldova</option>
  <option value="Monaco">Monaco</option>
  <option value="Mongolia">Mongolia</option>
  <option value="Montenegro">Montenegro</option>
  <option value="Morocco">Morocco</option>
  <option value="Mozambique">Mozambique</option>
  <option value="Myanmar">Myanmar</option>
  <option value="Namibia">Namibia</option>
  <option value="Nauru">Nauru</option>
  <option value="Nepal">Nepal</option>
  <option value="Netherlands">Netherlands</option>
  <option value="New Zealand">New Zealand</option>
  <option value="Nicaragua">Nicaragua</option>
  <option value="Niger">Niger</option>
  <option value="Nigeria">Nigeria</option>
  <option value="North Korea">North Korea</option>
  <option value="North Macedonia">North Macedonia</option>
  <option value="Norway">Norway</option>
  <option value="Oman">Oman</option>
  <option value="Pakistan">Pakistan</option>
  <option value="Palau">Palau</option>
  <option value="Palestine">Palestine</option>
  <option value="Panama">Panama</option>
  <option value="Papua New Guinea">Papua New Guinea</option>
  <option value="Paraguay">Paraguay</option>
  <option value="Peru">Peru</option>
  <option value="Philippines">Philippines</option>
  <option value="Poland">Poland</option>
  <option value="Portugal">Portugal</option>
  <option value="Qatar">Qatar</option>
  <option value="Romania">Romania</option>
  <option value="Russia">Russia</option>
  <option value="Rwanda">Rwanda</option>
  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
  <option value="Saint Lucia">Saint Lucia</option>
  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
  <option value="Samoa">Samoa</option>
  <option value="San Marino">San Marino</option>
  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
  <option value="Saudi Arabia">Saudi Arabia</option>
  <option value="Senegal">Senegal</option>
  <option value="Serbia">Serbia</option>
  <option value="Seychelles">Seychelles</option>
  <option value="Sierra Leone">Sierra Leone</option>
  <option value="Singapore">Singapore</option>
  <option value="Slovakia">Slovakia</option>
  <option value="Slovenia">Slovenia</option>
  <option value="Solomon Islands">Solomon Islands</option>
  <option value="Somalia">Somalia</option>
  <option value="South Africa">South Africa</option>
  <option value="South Korea">South Korea</option>
  <option value="South Sudan">South Sudan</option>
  <option value="Spain">Spain</option>
  <option value="Sri Lanka">Sri Lanka</option>
  <option value="Sudan">Sudan</option>
  <option value="Suriname">Suriname</option>
  <option value="Sweden">Sweden</option>
  <option value="Switzerland">Switzerland</option>
  <option value="Syria">Syria</option>
  <option value="Taiwan">Taiwan</option>
  <option value="Tajikistan">Tajikistan</option>
  <option value="Tanzania">Tanzania</option>
  <option value="Thailand">Thailand</option>
  <option value="Timor-Leste">Timor-Leste</option>
  <option value="Togo">Togo</option>
  <option value="Tonga">Tonga</option>
  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
  <option value="Tunisia">Tunisia</option>
  <option value="Turkey">Turkey</option>
  <option value="Turkmenistan">Turkmenistan</option>
  <option value="Tuvalu">Tuvalu</option>
  <option value="Uganda">Uganda</option>
  <option value="Ukraine">Ukraine</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="UK">UK</option>
  <option value="USA">USA</option>
  <option value="Uruguay">Uruguay</option>
  <option value="Uzbekistan">Uzbekistan</option>
  <option value="Vanuatu">Vanuatu</option>
  <option value="Vatican City">Vatican City</option>
  <option value="Venezuela">Venezuela</option>
  <option value="Vietnam">Vietnam</option>
  <option value="Yemen">Yemen</option>
  <option value="Zambia">Zambia</option>
  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="inspector">Inspector</label>
                <input type="text" id="inspector" name="Inspector" required />
              </div>

              <div className="form-group">
                <label htmlFor="sourceOfInspector">Source of Inspector</label>
                <input type="text" id="sourceOfInspector" name="Source of Inspector" required />
              </div>

             </div>

             <div className="form-section">

              <div className="form-group">
                <label htmlFor="startOfInspection">Start of Inspection</label>
                <input type="text" id="startOfInspection" name="StartofInspection" placeholder="Select multiple dates" required />
              </div>

              <div className="form-group">
                <label htmlFor="month">Month</label>
                <select id="month" name="Month" required>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div className="form-group">
              <label htmlFor="numberOfDays">Number of Days</label>
              <div className="sub-group">
              <input type="number" id="numberOfDaysValue" name="NumberOfDaysValue" min="1" placeholder="Enter value" required />
              <div className="no-of-days">
              <select id="numberOfDaysUnit" name="NumberOfDaysUnit" required>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
              </select>
              </div>
              </div>
              </div>

             </div>

             <div className="form-section">

              <div className="form-group">
                <label htmlFor="reportNumber">Report No</label>
                <input type="text" id="reportNumber" name="Report No" />
              </div>

              <div className="form-group">
                <label htmlFor="reportRecieved">Report Recieved</label>
                <input type="text" id="reportRecieved" name="Report Recieved" />
              </div>

              <div className="form-group">
                <label htmlFor="reportSubmitted">Report Submitted</label>
                <input type="text" id="reportSubmitted" name="Report Submitted" />
              </div>
              
             </div>

             <div className="form-section">

              <div className="form-group">
                <label htmlFor="inspectorRate">Inspector Rate</label>
                <input type="text" id="inspectorRate" name="InspectorRate" required />
              </div>

              <div className="form-group">
                <label htmlFor="inspectorRateCurrency">Inspector Rate Currency </label>
                <select id="inspectorRateCurrency" name="InspectorRateCurrency" required>
                  <option value="" disabled selected>--Select Currency--</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AED">AED</option>
                </select>   
              </div>

              <div className="form-group">
                <label htmlFor="offeredRate">Offered Rate</label>
                <input type="text" id="offeredRate" name="OfferedRate" required />
              </div>

             </div>

             <div className="form-section">
             
              <div className="form-group">
                <label htmlFor="offeredRateCurrency">Offered Rate Currency</label>
                <select id="offeredRateCurrency" name="OfferedRateCurrency" required>
                  <option value="" disabled selected>--Select Currency--</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AED">AED</option>
                </select>  
              </div>

              <div className="form-group">
                <label htmlFor="margin">Margin</label>
                <input type="text" id="margin" name="Margin" />
              </div>

              <div className="form-group">
                <label htmlFor="invoiceNumber">Invoice Number</label>
                <input type="text" id="invoiceNumber" name="InvoiceNumber" />
              </div>

             </div>

             <div className="form-section">
              
              <div className="form-group">
                <label htmlFor="ownerCoordinator">Owner</label>
                <select id="ownerCoordinator" name="OwnerCoordinator" required>
                  <option value="" disabled selected>--Select Coordinator--</option>
                  <option value="Arpita">Arpita</option>
                  <option value="Divya">Divya</option>
                  <option value="Indu">Indu</option>
                  <option value="Kavan">Kavan</option>
                  <option value="Neel">Neel</option>
                  <option value="Priti">Priti</option>
                </select>
              </div>

             </div>


              
              <div className="form-submit-button">
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </div>

            </div>
            </form>

            <div
              id="popup"
              style={{
                display: "none",
                position: "fixed",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "15px 25px",
                borderRadius: "5px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                zIndex: 1000,
                opacity: 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              Job Entry Submitted successfully!
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

