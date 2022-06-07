const BASE_URL = process.env.REACT_APP_BASE_URL;

const API_KEY = process.env.REACT_APP_API_KEY;

export const weatherService = {
  getCurrentWeatherInfo: (city, axios) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/data/2.5/weather?appid=${API_KEY}&q=${city}`,
    });
  },
};
