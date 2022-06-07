import React, { useContext, useEffect } from "react";

import axios from "axios";

import { ReactComponent as Humidity } from "../../assets/icons/humidity.svg";
import { ReactComponent as Thermometer } from "../../assets/icons/thermometer.svg";

import { LocationContext } from "../../contexts/locationContext";
import { WeatherContext } from "../../contexts/weatherContext";

import { weatherService } from "../../services/weatherService";

import "./WeatherInfoDetails.scss";

const WeatherInfoDetails = () => {
  const { city } = useContext(LocationContext);
  const { setWeatherData, weatherData } = useContext(WeatherContext);

  const degreeCelcius = weatherData?.main.temp - 273.15;

  useEffect(() => {
    weatherService.getCurrentWeatherInfo(city, axios).then((res) => {
      setWeatherData(res.data);
    });
  }, [city]);
  return (
    <div className="weather-info__details">
      {weatherData && (
        <>
          <img
            id="weather-info__icon"
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
            alt=""
          />
          <div className="weather-info__overview">
            <span>{weatherData.weather[0]?.main}</span>
            <div className="weather-info__status">
              <span>
                <Thermometer className="weather-info__status--temperature" />
                {Math.floor(degreeCelcius)}&#8451;
              </span>
              <span>
                <Humidity className="weather-info__status--humidity" />
                {Math.floor(weatherData.main.humidity)}%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherInfoDetails;
