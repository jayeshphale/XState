import React, { useState, useEffect } from "react";
import "./Statex.css";

function Statex() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state

  const API_BASE_URL = "https://crio-location-selector.onrender.com";

  // Fetch countries on initial load
  useEffect(() => {
    fetch(`${API_BASE_URL}/countries`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Countries fetched:", data);
        setCountries(data || []);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setErrorMessage("Failed to load countries."); // Set error message
      });
  }, []);

  // Fetch states when country is selected
  useEffect(() => {
    if (!selectedCountry) return;
    fetch(
      `${API_BASE_URL}/country=${encodeURIComponent(selectedCountry)}/states`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("States fetched:", data);
        setStates(data || []);
        setErrorMessage(""); // Clear error message
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setErrorMessage("Failed to load states."); // Set error message
      });
  }, [selectedCountry]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (!selectedState) return;
    fetch(
      `${API_BASE_URL}/country=${encodeURIComponent(
        selectedCountry
      )}/state=${encodeURIComponent(selectedState)}/cities`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Cities fetched:", data);
        setCities(data || []);
        setErrorMessage(""); // Clear error message
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setErrorMessage("Failed to load cities."); // Set error message
      });
  }, [selectedState, selectedCountry]);

  return (
    <div className="main_div">
      <div className="select_heading">Select Location</div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
      <select
        className="country_select"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setSelectedState("");
          setSelectedCity("");
          setStates([]);
          setCities([]);
          console.log("Country selected:", e.target.value);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        className="state_select"
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedCity("");
          setCities([]);
          console.log("State selected:", e.target.value);
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

      <select
        className="city_select"
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
          console.log("City selected:", e.target.value);
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