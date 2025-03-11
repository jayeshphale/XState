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
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/countries`);
                const data = await response.json();
                const trimmedData = data.map((item) => item.trim());
                console.log("Countries fetched:", trimmedData);
                setCountries(trimmedData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Fetch states when a country is selected
    useEffect(() => {
        if (!selectedCountry) return;
        const fetchStates = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/countries/${selectedCountry}/states`);
                const data = await response.json();
                console.log("States fetched:", data);
                setStates(data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        fetchStates();
    }, [selectedCountry]);

    // Fetch cities when a state is selected
    useEffect(() => {
        if (!selectedState || !selectedCountry) return;
        const fetchCities = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/countries/${selectedCountry}/states/${selectedState}/cities`);
                const data = await response.json();
                console.log("Cities fetched:", data);
                setCities(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
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
                    console.log("Country selected:", e.target.value);
                }}
            >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
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
                    console.log("State selected:", e.target.value);
                }}
                disabled={!selectedCountry}
            >
                <option value="">Select State</option>
                {states.map((state, index) => (
                    <option key={index} value={state}>
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
                    console.log("City selected:", e.target.value);
                }}
                disabled={!selectedState}
            >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {/* DISPLAY SELECTED VALUES */}
            <div className="All_thingsTogeter">
                {selectedCity && selectedState && selectedCountry && (
                    <p className="selected_city">
                        You selected {selectedCity}, {selectedState}, {selectedCountry}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Statex;
