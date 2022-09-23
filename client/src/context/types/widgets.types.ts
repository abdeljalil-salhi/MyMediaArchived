import { Dispatch } from "react";

import { WidgetsAction } from "../reducers/widgets.reducer";

export interface IWidgets {
  // Weather widget data and settings
  weather: IWidgetsWeather;
  // Dispatch function to update the state
  dispatch: Dispatch<WidgetsAction>;
}

export interface IWidgetsWeather {
  unit: string;
  query_type: string;
  query: string;
  data: {
    city: string;
    country: string;
    description: string;
    id: number;
    feels_like: number;
    humidity: number;
    temperature: number;
    wind: number;
    image: string | undefined;
  } | null;
}

// Types for the widgets reducer and actions
export type WidgetsActionPayload =
  | string
  | IWidgetsWeather["data"]
  | WidgetsWeatherQuerySettings;

export type WidgetsWeatherQuerySettings = {
  query_type: IWidgetsWeather["query_type"];
  query: IWidgetsWeather["query"];
};
