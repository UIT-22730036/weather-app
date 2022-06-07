import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { LocationProvider } from "./contexts/locationContext";
import { WeatherProvider } from "./contexts/weatherContext";

ReactDOM.render(
  <React.StrictMode>
    <LocationProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </LocationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
