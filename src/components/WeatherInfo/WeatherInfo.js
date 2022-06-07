import React from "react";

import WeatherCardsContainer from "../WeatherCardsContainer/WeatherCardsContainer";
import WeatherInfoDetails from "../WeatherInfoDetails/WeatherInfoDetails";

import "./WeatherInfo.scss";

const WeatherInfo = () => {
  return (
    <div className="weather-info">
      <WeatherInfoDetails />
      <WeatherCardsContainer />
    </div>
  );
};

export default WeatherInfo;
