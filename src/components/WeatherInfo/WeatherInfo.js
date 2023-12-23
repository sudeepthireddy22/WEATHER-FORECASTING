import React, { useState, useEffect } from "react";
import "./WeatherInfo.css";

const InfoPage = ({ selectedLocations, weatherData }) => {
  const goBackToFirstVisitedPage = () => {
    window.history.go(-(window.history.length - 1));
  };
  const [temperature, setTemperature] = useState([]);

  useEffect(() => {
    if (weatherData && weatherData.length > 0) {
      const temperatures = weatherData.map(city => Math.floor(city.main.temp - 273));
      setTemperature(temperatures);
    }
  }, [weatherData]);

  const getTemperatureColor = (temperature) => {
    if (temperature > 25) {
      return 'hot-theme'; 
    } else if (temperature < 10) {
      return 'cold-theme'; 
    } else {
      return 'moderate-theme'; 
    }
  };

  return (
    <>
      <div className="info-container">
        <div className="info-display">
          <div className="Top">
            <h3 className="headings">Weather Information for Selected Cities</h3>
            <button onClick={goBackToFirstVisitedPage} className="back-btn">
              Back
            </button>
          </div>
          <ul>
            {selectedLocations.map((location, index) => (
              <li key={index}>
                <h4>
                  {location.name}, {location.country}
                </h4>
                {weatherData &&
                  weatherData.length > 0 &&
                  weatherData[index] && (
                    <div>
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData[index].weather[0].icon}@2x.png`}
                        alt=""
                      />
                      <p className="weatherTemp">
                        Description: {weatherData[index].weather[0].description}
                      </p>
                      <div className={`temperature-theme ${getTemperatureColor(temperature[index])}`}>
                        <p className="weatherTemp">
                          Temperature: {temperature[index]}°C
                        </p>
                      </div>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={goBackToFirstVisitedPage} className="back-btn">
        Back
      </button>
    </>
  );
};

export default InfoPage;
