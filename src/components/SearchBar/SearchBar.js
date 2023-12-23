import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ onLocationSelect, onSubmit }) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("");

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          inputValue
        )}&limit=10&appid=28f0d94883a580da12d0cc81996d0be7`
      );
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSelect = (location) => {
    const isAlreadySelected = selectedCities.some(
      (selected) => selected.name === location.name
    );
    if (!isAlreadySelected) {
      const updatedCities = [
        ...selectedCities,
        {
          lat: location.lat,
          lon: location.lon,
          name: location.name,
          country: location.country,
        },
      ];
      setSelectedCities(updatedCities);
      setCity("");
      setSuggestions([]);

      onLocationSelect(updatedCities);
    }
    setCity("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedCities);
  };

  const removeSelectedOption = (city) => {
    const updatedOptions = selectedCities.filter(
      (selected) => selected.name !== city.name
    );
    setSelectedCities(updatedOptions);
  };

  return (
    <div className="SearchContainer">
      <div className="container"></div>
      <img
        src="https://see.fontimg.com/api/renderfont4/8xp2/eyJyIjoiZnMiLCJoIjo5OCwidyI6MTUwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/d2VhdGhlciBhcHA/cf-snowball-regular.png"
        alt="logo"
        className="logo-img"
      />
      <div className="SearchIcon">
        <form onSubmit={handleFormSubmit}>
          {selectedCities.length > 0 && (
            <div className="selected-cities">
              {selectedCities.map((city, index) => (
                <div className="selected-option" key={index}>
                  {city.name}, {city.country}
                  <button
                    className="remove-option"
                    onClick={() => removeSelectedOption(city)}
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="input-container">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="search-box"
            />
            <button className="clear-search" onClick={() => setCity("")}>
              &#10005;
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>

      {city && suggestions.length > 0 && (
        <div className="selectdropdown">
          {suggestions.map((location, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleLocationSelect(location)}
            >
              {location.name}, {location.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
