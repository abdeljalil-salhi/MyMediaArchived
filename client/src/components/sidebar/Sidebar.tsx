import { FC, useEffect, useState, KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AirRounded,
  Chat,
  DeviceThermostatRounded,
  Group,
  InvertColorsRounded,
  LocationOnRounded,
  PlayCircleRounded,
  RssFeed,
  StoreRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";

import Cloudy from "../../assets/weather/cloudy.png";
import Sun from "../../assets/weather/sun.png";
import Storm from "../../assets/weather/storm.png";
import Snow from "../../assets/weather/snow.png";
import Haze from "../../assets/weather/haze.png";
import Rainy from "../../assets/weather/rainy-day.png";
import { PREFERENCES, PU, TRANSPARENT, WEATHER_API } from "../../globals";
import { CloseFriend } from "../closeFriend/CloseFriend";
import { useAppSelector } from "../../store/hooks";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { IProfileState } from "../../store/types/profileTypes";
import { getLocalStorage } from "../../utils/localStorage";
import { isEmpty } from "../../utils/isEmpty";
import { myRound } from "../../utils/math";
import { capitalizeString } from "../../utils/string";

interface SidebarProps {}

const profileStateSelector = createSelector(
  makeSelectProfile,
  (profile: IProfileState["data"]) => ({
    profile: profile.user,
  })
);

export const Sidebar: FC<SidebarProps> = () => {
  const [preferences, setPreferences] = useState<any>({});

  // The states below are used by the weather useEffect() hook
  const [weatherShow, setWeatherShow] = useState<boolean>(false);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<boolean>(false);
  const [weatherInfo, setWeatherInfo] = useState<string>(
    "Press Enter to submit."
  );
  const [weatherData, setWeatherData] = useState<any>({
    city: "",
    country: "",
    description: "",
    id: 0,
    feels_like: 0,
    humidity: 0,
    temperature: 0,
    wind: 0,
    image: null,
  });

  const location = useLocation();

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(profileStateSelector);

  const handleWeather = () => {
    // Recheck if the browser supports the geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onWeatherSuccess,
        onWeatherError
      );
    } else {
      setWeatherError(true);
      setWeatherInfo("Your browser does not support the Geolocation API.");
    }
  };

  const onWeatherSuccess: PositionCallback = (
    position: GeolocationPosition
  ) => {
    // Get latitude and longitude from the position object passed in by Geolocation API
    const { latitude, longitude } = position.coords;

    fetchWeather(
      `${WEATHER_API}&units=${"metric"}&lat=${latitude}&lon=${longitude}`
    );
  };

  // Handle geolocation errors
  const onWeatherError: PositionErrorCallback = (
    error: GeolocationPositionError
  ) => {
    if (error.code === 1) {
      // If the user denied the Geolocation API permission
      setWeatherError(true);
      setWeatherInfo("You denied the location permission.");
    } else if (error.code === 2) {
      // If the user's location is not available
      setWeatherError(true);
      setWeatherInfo("Your location is not recognized by our server.");
    } else {
      // Handle any other unknown error codes
      setWeatherError(true);
      setWeatherInfo("Something went wrong. Please try again later.");
    }
  };

  const weatherAction = (response: any) => {
    if (response.cod === "404") {
      setWeatherError(true);
      setWeatherInfo("City not found. Please try again.");
    } else {
      setWeatherInfo("Press Enter to submit.");
      setWeatherShow(true);

      console.log(response);

      let id = response.weather[0].id;

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
            : null,
      });
    }
  };

  useEffect(() => {
    setPreferences(getLocalStorage(PREFERENCES));
  }, []);

  const getWeather = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isEmpty(event.currentTarget.value))
      fetchWeather(
        `${WEATHER_API}&units=${"metric"}&q=${event.currentTarget.value}`
      );
  };

  const fetchWeather = (api: string) => {
    // Reset the errors
    setWeatherError(false);
    setWeatherInfo("Getting weather details...");

    // Start the fetching process by turning the loading state to true
    setWeatherLoading(true);

    fetch(api)
      .then((res: Response) => res.json())
      .then((result: any) => weatherAction(result))
      .catch((_: unknown) => {
        setWeatherError(true);
        setWeatherInfo("Something went wrong. Please try again later.");
      });

    // End the fetching process by turning the loading state to false
    setWeatherLoading(false);
  };

  return (
    <div className="sidebarContainer">
      <div className="sidebarWrapper">
        <div className="sidebar__widgets">
          <div className={`widget__weather`}>
            <h3>MyWeather</h3>
            {weatherShow ? (
              <div className="widget__weather-section">
                <div className="widget__weather-section-flex">
                  <img src={weatherData.image} alt="MyWeather Icon" />
                  <span className="widget__weather-section-temp">
                    {weatherData.temperature}°C
                  </span>
                  <span className="widget__weather-section-desc">
                    {weatherData.description}
                  </span>
                </div>
                <div className="widget__weather-section-flex">
                  <div className="widget__weather-section-location">
                    <LocationOnRounded />
                    <span>
                      {weatherData.city}, {weatherData.country}
                    </span>
                  </div>
                  <div className="widget__weather-section-details">
                    <div className="widget__weather-section-details-flex">
                      <DeviceThermostatRounded />
                      <div>
                        <span>{weatherData.feels_like}°C</span>
                        <p>Feels like</p>
                      </div>
                    </div>
                    <div className="widget__weather-section-details-flex">
                      <InvertColorsRounded />
                      <div>
                        <span>{weatherData.humidity}%</span>
                        <p>Humidity</p>
                      </div>
                    </div>
                    <div className="widget__weather-section-details-flex">
                      <AirRounded />
                      <div>
                        <span>{weatherData.wind}km/h</span>
                        <p>Wind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="widget__weather-input">
                <span className="widget__weather-input-info">
                  {weatherInfo}
                </span>
                <div className="widget__weather-input-content">
                  <input
                    type="text"
                    spellCheck={false}
                    placeholder="Enter city name"
                    onKeyDown={getWeather}
                  />
                  <div className="widget__weather-input-separator">or</div>
                  <Button onClick={handleWeather}>Get device location</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sidebarItems">
          <Link to={profile ? `/u/${profile.username}` : ""} draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === `/u/${profile?.username}`
                  ? " sidebarItemActive"
                  : ""
              }`}
            >
              <span>
                <img
                  src={
                    profile && profile.profile
                      ? `${PU}${profile.profile}`
                      : TRANSPARENT
                  }
                  className="avatar skeleton"
                  alt={profile ? profile.fullName : ""}
                  draggable={false}
                />
                <span className="onlineFriendStatus"></span>
              </span>
              <span className="sidebarItemText sidebarProfileContainer">
                <span>
                  {profile ? (
                    profile.fullName
                  ) : (
                    <div className="skeleton skeleton-text"></div>
                  )}
                </span>
                <small>
                  {profile ? (
                    `@${profile.username}`
                  ) : (
                    <div className="skeleton skeleton-text"></div>
                  )}
                </small>
              </span>
            </div>
          </Link>
          <Link to="/" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/" ? " sidebarItemActive" : ""
              }`}
            >
              <RssFeed />
              <div className="sidebarItemText">Feed</div>
            </div>
          </Link>
          <Link to="/direct" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/direct" ? "sidebarItemActive" : ""
              }`}
            >
              <Chat />
              <div className="sidebarItemText">Direct</div>
            </div>
          </Link>
          <Link to="/videos" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/videos" ? "sidebarItemActive" : ""
              }`}
            >
              <PlayCircleRounded />
              <div className="sidebarItemText">Videos</div>
            </div>
          </Link>
          <Link to="/groups" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/groups" ? "sidebarItemActive" : ""
              }`}
            >
              <Group />
              <div className="sidebarItemText">Groups</div>
            </div>
          </Link>
          <Link to="/marketplace" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/marketplace" ? "sidebarItemActive" : ""
              }`}
            >
              <StoreRounded />
              <div className="sidebarItemText">Marketplace</div>
            </div>
          </Link>
        </div>
        <div className="sidebarCloseFriends">
          <h4>Close Friends</h4>
          {profile &&
            profile.closeObj &&
            profile.closeObj.map((u: any, i: any) => (
              <CloseFriend key={i} user={u} />
            ))}
        </div>
      </div>
    </div>
  );
};
