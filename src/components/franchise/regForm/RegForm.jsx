import React, { useState } from "react";
import "./RegForm.css";

const RegForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cityState: "",
    occupation: "",
    netWorth: "",
    liquidAssets: "",
    preferredLocation: "",
    address: "",
    howHeard: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="reg-form-wrapper">
      <div className="header-section">
        <h2 className="main-header">Interested in Franchising?</h2>
        <h4 className="sub-header">Contact us Below</h4>
      </div>

      <form className="reg-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="cityState"
              name="cityState"
              placeholder="City/State of Residence"
              value={formData.cityState}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              id="occupation"
              name="occupation"
              placeholder="Current Occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="netWorth"
              name="netWorth"
              placeholder="Net Worth"
              value={formData.netWorth}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              id="liquidAssets"
              name="liquidAssets"
              placeholder="Liquid Assets"
              value={formData.liquidAssets}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              placeholder="Preferred Location"
              value={formData.preferredLocation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Provide an Address (if applicable)"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="howHeard"
              name="howHeard"
              placeholder="How did you hear about us?"
              value={formData.howHeard}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <textarea
              id="notes"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegForm;