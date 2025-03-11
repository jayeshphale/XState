import React, { useState, useEffect } from "react";
import "./Statex.css";

function Statex() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [error, setError] = useState(null);

    useEffect(() => {
    if (!selectedCountry) return;
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        if (!response.ok) throw new Error("Failed to fetch states");
        const data = await response.json();
        setStates(data);
      } catch (error) {
        setError("Error fetching states");
        console.error(error);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError("Error fetching countries");
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError("Error fetching cities");
        console.error(error);
      }
    };

    fetchCities();
  }, [selectedState]);

  return (
    <div className="main_div">
      <h2 className="select_heading">Select Location</h2>

      {error && <p className="error_message">{error}</p>}

      <div className="select_container">
        {/* Country Dropdown */}
        <select
          className="dropdown"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
            setStates([]);
            setCities([]);
            setError(null);
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          className="dropdown"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
            setCities([]);
            setError(null);
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

        {/* City Dropdown */}
        <select
          className="dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

 
      {/* Display Selected Location - FIXED */}
      {selectedCity && selectedState && selectedCountry && (
        <div className="location_display">
          <p className="selected_label">
            You selected <span className="selected_city">{selectedCity}</span>,{" "}
            <span className="selected_state">{selectedState}</span>,{" "}
            <span className="selected_country">{selectedCountry}</span>
          </p>
        </div>
      )}
    </div>
  );
}
export default Statex;