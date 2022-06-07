import { createContext, useState } from "react";

export const WeatherContext = createContext({
  weatherData: null,
  setWeatherData: () => null,
});

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const value = { weatherData, setWeatherData };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
