import React, { useState, useEffect } from "react";
import "./Statex.css";

function Statex() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const API_BASE_URL = "https://crio-location-selector.onrender.com";

  // Fetch countries on initial load
  useEffect(() => {
    fetch(`${API_BASE_URL}/countries`)
      .then((res) => res.json())
      .then((data) => setCountries(data || []))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states when country is selected
  useEffect(() => {
    if (!selectedCountry) return;
    fetch(`${API_BASE_URL}/country=${selectedCountry}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data || []))
      .catch((error) => console.error("Error fetching states:", error));
  }, [selectedCountry]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (!selectedState) return;
    fetch(`${API_BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data || []))
      .catch((error) => console.error("Error fetching cities:", error));
  }, [selectedState, selectedCountry]);

  return (
    <div className="main_div">
      <div className="select_heading">Select Location</div>

      {/* COUNTRY SELECT */}
      <select
        className="country_select"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setSelectedState("");
          setSelectedCity("");
          setStates([]);
          setCities([]);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* STATE SELECT */}
      <select
        className="state_select"
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedCity("");
          setCities([]);
        }}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* CITY SELECT */}
      <select
        className="city_select"
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
        }}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* DISPLAY SELECTED VALUES */}
      <div className="All_thingsTogeter">
        {selectedCountry && selectedState && selectedCity && (
          <p className="selected_city">
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        )}
      </div>
    </div>
  );
}

export default Statex;
