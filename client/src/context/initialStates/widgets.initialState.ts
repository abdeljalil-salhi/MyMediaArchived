import { PREFERENCES, GEO } from "../../globals";
import { ILocalStoragePreferences } from "../../utils/interfaces/IPreferences";
import { isEmpty } from "../../utils/isEmpty";
import { getLocalStorage } from "../../utils/localStorage";
import { WidgetsAction } from "../reducers/widgets.reducer";
import { IWidgets, IWidgetsWeather } from "../types/widgets.types";

export const widgetsWeatherInitialState: IWidgetsWeather = {
  unit: !isEmpty(
    (getLocalStorage(PREFERENCES) as ILocalStoragePreferences)?.weather?.unit
  )
    ? (getLocalStorage(PREFERENCES) as ILocalStoragePreferences).weather.unit
    : "metric",
  query_type: !isEmpty(
    (getLocalStorage(PREFERENCES) as ILocalStoragePreferences)?.weather
      ?.query_type
  )
    ? (getLocalStorage(PREFERENCES) as ILocalStoragePreferences).weather
        .query_type
    : "city",
  query: !isEmpty(
    (getLocalStorage(PREFERENCES) as ILocalStoragePreferences)?.weather?.query
  )
    ? (getLocalStorage(PREFERENCES) as ILocalStoragePreferences).weather.query
    : !isEmpty((getLocalStorage(GEO) as any)?.city)
    ? (getLocalStorage(GEO) as any).city
    : "",
  data: null,
};

export const widgetsInitialState: IWidgets = {
  weather: widgetsWeatherInitialState,
  dispatch: (_: WidgetsAction) => {},
};
