import {
  FC,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useContext,
} from "react";
import {
  LocationOnRounded,
  DeviceThermostatRounded,
  InvertColorsRounded,
  AirRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import Cloudy from "../../assets/weather/cloudy.png";
import Sun from "../../assets/weather/sun.png";
import Storm from "../../assets/weather/storm.png";
import Snow from "../../assets/weather/snow.png";
import Haze from "../../assets/weather/haze.png";
import Rainy from "../../assets/weather/rainy-day.png";
import { PREFERENCES, WEATHER_API } from "../../globals";
import { isEmpty } from "../../utils/isEmpty";
import { myRound } from "../../utils/math";
import { capitalizeString } from "../../utils/string";
import { WidgetsContext } from "../../context/widgets.context";
import { setWeatherData } from "../../context/actions/widgets.actions";
import { getLocalStorage, updateLocalStorage } from "../../utils/localStorage";
import { ILocalStoragePreferences } from "../../utils/interfaces/IPreferences";

interface WeatherWidgetProps {}

export const WeatherWidget: FC<WeatherWidgetProps> = () => {
  // The states below are used by the weather useEffect() hook
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherInfo, setWeatherInfo] = useState<string>(
    "Press Enter to submit."
  );

  // The selector to get user informations from the context (ContextAPI)
  const { weather, dispatch } = useContext(WidgetsContext);

  const handleWeather = () => {
    // Recheck if the browser supports the geolocation API
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        onWeatherSuccess,
        onWeatherError
      );
    else setWeatherInfo("Your browser does not support the Geolocation API.");
  };

  const onWeatherSuccess: PositionCallback = (
    position: GeolocationPosition
  ) => {
    // Get latitude and longitude from the position object passed in by Geolocation API
    const { latitude, longitude }: GeolocationCoordinates = position.coords;

    const prev = getLocalStorage(PREFERENCES) as ILocalStoragePreferences;
    updateLocalStorage(PREFERENCES, {
      ...prev,
      weather: {
        unit: weather.unit,
        query_type: "coords",
        query: {
          latitude,
          longitude,
        },
      },
    });

    fetchWeather(
      `${WEATHER_API}&units=${weather.unit}&lat=${latitude}&lon=${longitude}`
    );
  };

  // Handle geolocation errors
  const onWeatherError: PositionErrorCallback = (
    error: GeolocationPositionError
  ) => {
    if (error.code === 1)
      // If the user denied the Geolocation API permission
      setWeatherInfo("You denied the location permission.");
    else if (error.code === 2)
      // If the user's location is not available
      setWeatherInfo("Your location is not recognized by our server.");
    // Handle any other unknown error codes
    else setWeatherInfo("Something went wrong. Please try again later.");
  };

  const weatherAction = (response: any) => {
    if (response.cod === "404")
      // If the city is not found in the database
      setWeatherInfo("City not found. Please try again.");
    else {
      setWeatherInfo("Press Enter to submit.");

      let id = response.weather[0].id;

      const prev = getLocalStorage(PREFERENCES) as ILocalStoragePreferences;
      updateLocalStorage(PREFERENCES, {
        ...prev,
        weather: {
          unit: weather.unit,
          query_type: "city",
          query: response.name,
        },
      });

      dispatch(
        setWeatherData({
          city: response.name,
          country: response.sys.country,
          description: capitalizeString(response.weather[0].description),
          id,
          feels_like: myRound(response.main.feels_like, -1),
          humidity: myRound(response.main.humidity, -1),
          temperature: myRound(response.main.temp, -1),
          wind: myRound(response.wind.speed, -1),
          image:
            id === 800
              ? Sun
              : id >= 200 && id <= 232
              ? Storm
              : (id >= 300 && id <= 321) || (id >= 500 && id <= 531)
              ? Rainy
              : id >= 600 && id <= 622
              ? Snow
              : id >= 701 && id <= 781
              ? Haze
              : id >= 801 && id <= 804
              ? Cloudy
              : undefined,
        })
      );
    }
  };

  const getWeather = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      !isEmpty(event.currentTarget.value) &&
      !weatherLoading
    )
      fetchWeather(
        `${WEATHER_API}&units=${weather.unit}&q=${event.currentTarget.value}`
      );
  };

  const fetchWeather = (api: string) => {
    // Reset the errors
    setWeatherInfo("Getting weather details...");

    // Start the fetching process by turning the loading state to true
    setWeatherLoading(true);

    fetch(api)
      .then((res: Response) => res.json())
      .then((result: any) => weatherAction(result))
      .catch((_: unknown) => {
        setWeatherInfo("Something went wrong. Please try again later.");
      });

    // End the fetching process by turning the loading state to false
    setWeatherLoading(false);
  };

  if (weather.query && !weather.data) return null;

  return (
    <div className="widget__weather">
      <h3>MyWeather</h3>
      {weather.data ? (
        <div className="widget__weather-section">
          <div className="widget__weather-section-flex">
            <img src={weather.data.image} alt="MyWeather Icon" />
            <span className="widget__weather-section-temp">
              {weather.data.temperature}°
              {weather.unit === "metric"
                ? "C"
                : weather.unit === "imperial"
                ? "F"
                : "K"}
            </span>
            <span className="widget__weather-section-desc">
              {weather.data.description}
            </span>
          </div>
          <div className="widget__weather-section-flex">
            <div className="widget__weather-section-location">
              <LocationOnRounded />
              <span>
                {weather.data.city}, {weather.data.country}
              </span>
            </div>
            <div className="widget__weather-section-details">
              <div className="widget__weather-section-details-flex">
                <DeviceThermostatRounded />
                <div>
                  <span>
                    {weather.data.feels_like}°
                    {weather.unit === "metric"
                      ? "C"
                      : weather.unit === "imperial"
                      ? "F"
                      : "K"}
                  </span>
                  <p>Feels like</p>
                </div>
              </div>
              <div className="widget__weather-section-details-flex">
                <InvertColorsRounded />
                <div>
                  <span>{weather.data.humidity}%</span>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="widget__weather-section-details-flex">
                <AirRounded />
                <div>
                  <span>{weather.data.wind}km/h</span>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="widget__weather-input">
          <span className="widget__weather-input-info">{weatherInfo}</span>
          <div className="widget__weather-input-content">
            <input
              type="text"
              spellCheck={false}
              placeholder="Enter city name"
              onKeyDown={getWeather}
            />
            <div className="widget__weather-input-separator">or</div>
            <Button onClick={() => !weatherLoading && handleWeather()}>
              Get device location
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
