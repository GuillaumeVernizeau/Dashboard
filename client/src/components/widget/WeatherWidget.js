import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Widget.css";

const WeatherWidget = ({
  id,
  title,
  cityName,
  onCityNameChange,
  onSave,
  Time,
}) => {
  const [cityNameInput, setCityNameInput] = useState(cityName || "");
  const [editMode, setEditMode] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(Time || 5);

  const fetchData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (cityNameInput) {
      fetchData();
    }
  }, []);

  const handleCityNameInputChange = (event) => {
    const value = event.target.value;
    setCityNameInput(value);
  };

  const handleValidateClick = () => {
    setEditMode(false);
    onCityNameChange && onCityNameChange(cityNameInput);
    fetchData();
    onSave && onSave(id, "weather", cityNameInput, null, refreshInterval);
  };

  const handleRefreshIntervalChange = (event) => {
    const value = event.target.value;
    setRefreshInterval(parseInt(value));
  };

  return (
    <div className="widget weather-widget" key={id}>
      {!editMode && (
        <div className="weather-info">
          <h3 className="city-name">{cityNameInput}</h3>
          <h4>{cityNameInput && temperature ? `${temperature}°C` : title}</h4>
        </div>
      )}
      <div className="widget-title">Widget Météo</div>
      {editMode ? (
        <div>
          <label>
            City name:
            <input
              type="text"
              value={cityNameInput}
              onChange={handleCityNameInputChange}
            />
          </label>
          <br />
          <label>
            Refresh interval (minutes):
            <input
              type="number"
              value={refreshInterval}
              onChange={handleRefreshIntervalChange}
            />
          </label>
          <br />
          <button onClick={handleValidateClick} className="edit-button">
            Validate
          </button>
        </div>
      ) : (
        <div className="edit-button-container">
          <button onClick={() => setEditMode(true)} className="edit-button">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
