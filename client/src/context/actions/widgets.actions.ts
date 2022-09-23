import {
  SET_WEATHER_UNIT,
  SET_WEATHER_DATA,
  SET_WEATHER_QUERY_SETTINGS,
} from "../constants/widgets.constants";
import { IWidgetsWeather } from "../types/widgets.types";

export const setWeatherUnit = (unit: IWidgetsWeather["unit"]) => ({
  type: SET_WEATHER_UNIT,
  payload: unit,
});

export const setWeatherData = (data: IWidgetsWeather["data"]) => ({
  type: SET_WEATHER_DATA,
  payload: data,
});

export const setWeatherQuerySettings = (
  query_type: IWidgetsWeather["query_type"],
  query: IWidgetsWeather["query"]
) => ({
  type: SET_WEATHER_QUERY_SETTINGS,
  payload: { query_type, query },
});
