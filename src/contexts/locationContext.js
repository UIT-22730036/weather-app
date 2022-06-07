import { createContext, useState } from "react";

export const LocationContext = createContext({
  city: null,
  setCity: () => null,
});

export const LocationProvider = ({ children }) => {
  const [city, setCity] = useState("Singapore");
  const value = { city, setCity };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
