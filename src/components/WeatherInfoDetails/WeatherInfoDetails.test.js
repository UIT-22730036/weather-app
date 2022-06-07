import { weatherService } from "../../services/weatherService";
import { render, fireEvent } from "@testing-library/react";
import Header from "../Header/Header";
test("Should display the weather detail of selected location when users select a location with Singapore as the default location", async () => {
  const mockAxios = jest.fn();
  mockAxios
    .mockResolvedValueOnce({
      name: "Singapore",
      main: {
        temp: 300,
        humidity: 60,
        pressure: 1008,
      },
      wind: {
        speed: 5.14,
      },
    })
    .mockResolvedValue({
      name: "Manchester",
      main: {
        temp: 200,
        humidity: 50,
        pressure: 1006,
      },
      wind: {
        speed: 4.14,
      },
    });
  const { getByTestId, getAllByTestId } = render(<Header />);
  const select = getByTestId("city-name");
  const options = getAllByTestId("select-option");

  // When load page(default)
  await weatherService
    .getCurrentWeatherInfo("Singapore", mockAxios)
    .then((res) => {
      expect(mockAxios).toBeCalledWith({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?appid=429b355d2659e77394febd5a0967adf9&q=Singapore",
      });
      expect(res).toEqual({
        name: "Singapore",
        main: {
          temp: 300,
          humidity: 60,
          pressure: 1008,
        },
        wind: {
          speed: 5.14,
        },
      });
    });
  // Change city to Manchester
  fireEvent.change(select, {
    target: {
      value: "Manchester",
    },
  });
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();
  expect(options[3].selected).toBeFalsy();
  expect(options[4].selected).toBeTruthy();
  expect(options[5].selected).toBeFalsy();
  await weatherService
    .getCurrentWeatherInfo("Manchester", mockAxios)
    .then((res) => {
      expect(mockAxios).toBeCalledWith({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?appid=429b355d2659e77394febd5a0967adf9&q=Manchester",
      });
      expect(res).toEqual({
        name: "Manchester",
        main: {
          temp: 200,
          humidity: 50,
          pressure: 1006,
        },
        wind: {
          speed: 4.14,
        },
      });
    });
});
