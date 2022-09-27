import { IWeatherData } from "interfaces";
import convertToKm from "./convertToKm";
import getExactHours from "./getExactHour";
import getWindDir from "./getWindDir";

const dataFormatter = (data: IWeatherData | undefined) => {
if (data?.current) {
        data.current.dt = `${getExactHours(data.current.dt as number)}`;
        data.current.humidity = `${data?.current.humidity} %`;
        data.current.temp = `${data.current.temp} ºC`;
        data.current.feels_like = `${data.current.feels_like} ºC`;
        data.current.uvi = `${(data.current.uvi as number).toFixed(0)}`;
        data.current.dew_point = `${data.current.dew_point} ºC`;
        data.current.visibility = `${data.current.visibility} km`;
        data.current.sunrise = `${getExactHours(
          data.current.sunrise as number
        )}`;
        data.current.sunset = `${getExactHours(data.current.sunset as number)}`;
        data.current.pressure = `${data.current.pressure} hPa`;
        data.current.clouds = `${data.current.clouds} %`;
        data.current.wind_deg = `${getWindDir(
          data.current.wind_deg as number
        )}`;
        data.current.wind_speed = `${convertToKm(
          data.current.wind_speed as number
        )}`;
        if (data.current.rain) {
          data.current.rain["1h"] = `${data.current.rain["1h"]} mm`;
          if (data.current.rain["3h"])
            data.current.rain["3h"] = `${data.current.rain["3h"]} mm`;
        }

        if (data.current.snow) {
          data.current.snow["1h"] = `${data.current.snow["1h"]} mm`;
          if (data.current.snow["3h"])
            data.current.snow["3h"] = `${data.current.snow["3h"]} mm`;
        }
}
  if (data?.minutely) {
    data.minutely.forEach((minute) => {
     minute.dt = `${getExactHours(minute.dt as number)}`
    minute.precipitation = `${minute.precipitation} mm`
    })

    if (data?.hourly) {
      data.hourly.forEach((hour) => {
        hour.dt = `${getExactHours(hour.dt as number)}`;
        hour.humidity = `${hour.humidity} %`;
        hour.temp = `${hour.temp} ºC`;
        hour.feels_like = `${hour.feels_like} ºC`;
        hour.uvi = `${(hour.uvi as number).toFixed(0)}`;
        data.current.dew_point = `${data.current.dew_point} ºC`;
        hour.visibility = `${hour.visibility} km`;
        hour.pressure = `${hour.pressure} hPa`;
        hour.clouds = `${hour.clouds} %`;
        hour.wind_deg = `${getWindDir(
          hour.wind_deg as number
        )}`;
        hour.wind_speed = `${convertToKm(
          hour.wind_speed as number
        )}`;
        if (hour.rain) {
          hour.rain["1h"] = `${hour.rain["1h"]} mm`;
          if (hour.rain["3h"])
            hour.rain["3h"] = `${hour.rain["3h"]} mm`;
        }

      })

  }
  }

  return data;
}

export default dataFormatter