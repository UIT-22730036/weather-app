const BASE_URL = "https://api.openweathermap.org";

const API_KEY = "429b355d2659e77394febd5a0967adf9";

export const weatherService = {
  getCurrentWeatherInfo: (city, axios) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/data/2.5/weather?appid=${API_KEY}&q=${city}`,
    });
  },
};
