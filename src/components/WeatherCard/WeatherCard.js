import React from "react";

import "./WeatherCard.scss";

const WeatherCard = ({ item }) => {
  const { title, data, extra, content } = item;

  return (
    <div className="weather-card">
      {title ? (
        <span className="weather-card__title">{title}</span>
      ) : (
        <>
          <button className="weather-card__add-btn"></button>
          <span className="weather-card__add-text">Add</span>
        </>
      )}
      {data && <span className="weather-card__data">{data}</span>}
      {extra && <span className="weather-card__extra">{extra}</span>}
      {content && <span className="weather-card__content"></span>}
    </div>
  );
};

export default WeatherCard;
