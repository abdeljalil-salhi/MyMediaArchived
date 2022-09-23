import {
  SET_WEATHER_DATA,
  SET_WEATHER_QUERY_SETTINGS,
  SET_WEATHER_UNIT,
} from "../constants/widgets.constants";
import {
  WidgetsActionPayload,
  WidgetsWeatherQuerySettings,
} from "../types/widgets.types";

type WidgetsState = Record<string, any>;
export type WidgetsAction = {
  type: string;
  payload?: WidgetsActionPayload;
};

const WidgetsReducer = (
  state: WidgetsState,
  action: WidgetsAction
): WidgetsState => {
  switch (action.type) {
    case SET_WEATHER_UNIT:
      return {
        ...state,
        weather: {
          ...state.weather,
          unit: action.payload,
        },
      };
    case SET_WEATHER_DATA:
      return {
        ...state,
        weather: {
          ...state.weather,
          data: action.payload,
        },
      };
    case SET_WEATHER_QUERY_SETTINGS:
      return {
        ...state,
        weather: {
          ...state.weather,
          query_type: (action.payload as WidgetsWeatherQuerySettings)
            .query_type,
          query: (action.payload as WidgetsWeatherQuerySettings).query,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default WidgetsReducer;
