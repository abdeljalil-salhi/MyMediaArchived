import Cloudy from "../../assets/weather/cloudy.png";
import Sun from "../../assets/weather/sun.png";
import Storm from "../../assets/weather/storm.png";
import Snow from "../../assets/weather/snow.png";
import Haze from "../../assets/weather/haze.png";
import Rainy from "../../assets/weather/rainy-day.png";
import { myRound } from "../../utils/math";
import { capitalizeString } from "../../utils/string";

export const formatWeatherData = (data: any) => {
  let id = data.weather[0].id;

  return {
    city: data.name,
    country: data.sys.country,
    description: capitalizeString(data.weather[0].description),
    id,
    feels_like: myRound(data.main.feels_like, -1),
    humidity: myRound(data.main.humidity, -1),
    temperature: myRound(data.main.temp, -1),
    wind: myRound(data.wind.speed, -1),
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
  };
};
