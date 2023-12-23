import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import InfoPage from "../WeatherInfo/WeatherInfo";
import "./Main.css";

const Home = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const handleLocationSelect = (locations) => {
    setSelectedLocations(locations);
  };

  const handleSubmit = async (selectedCities) => {
    try {
      const weatherPromises = selectedCities.map(async (location) => {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=28f0d94883a580da12d0cc81996d0be7`
        );
        return data;
      });

      const weatherResults = await Promise.all(weatherPromises);

      setWeatherData(weatherResults);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("selectedLocations:", selectedLocations);

  return (
    <>
      <div>
        <div className="components">
          {selectedLocations.length > 0 && weatherData.length > 0 ? (
            <InfoPage
              selectedLocations={selectedLocations}
              weatherData={weatherData}
            />
          ) : (
            <SearchBar
              onLocationSelect={handleLocationSelect}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
