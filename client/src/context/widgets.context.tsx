import { createContext, FC, ReactNode, useReducer, useEffect } from "react";

import WidgetsReducer from "./reducers/widgets.reducer";
import { IWidgets } from "./types/widgets.types";
import { widgetsInitialState } from "./initialStates/widgets.initialState";
import { isEmpty } from "../utils/isEmpty";
import { WEATHER_API } from "../globals";
import { setWeatherData } from "./actions/widgets.actions";
import { formatWeatherData } from "./helpers/widgets.helpers";

interface WidgetsContextProps {
  children: ReactNode;
}

const INITIAL_STATE: IWidgets = widgetsInitialState;

export const WidgetsContext = createContext<IWidgets>(INITIAL_STATE);

export const WidgetsContextProvider: FC<WidgetsContextProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(WidgetsReducer, INITIAL_STATE);

  useEffect(() => {
    const fetchWeather = (api: string) => {
      fetch(api)
        .then((res: Response) => res.json())
        .then((result: any) => {
          if (result.cod !== "404")
            dispatch(setWeatherData(formatWeatherData(result)));
        })
        .catch((_: unknown) => {});
    };

    if (!isEmpty(state.weather.query) && isEmpty(state.weather.data)) {
      const { unit, query_type, query } = state.weather;

      if (query_type === "coords")
        fetchWeather(
          `${WEATHER_API}&units=${unit}&lat=${query.latitude}&lon=${query.longitude}`
        );
      else if (query_type === "city")
        fetchWeather(`${WEATHER_API}&units=${unit}&q=${query}`);
    }
  }, [state.weather]);

  return (
    <WidgetsContext.Provider
      value={{
        weather: state.weather,
        dispatch,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
};
