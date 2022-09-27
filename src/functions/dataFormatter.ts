import { IWeatherData } from "interfaces";
import convertToKm from "./convertToKm";
import getExactHours from "./getExactHour";
import getFormattedDate from "./getFormattedDate";
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
    )} km/h`;
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
  }
  if (data?.hourly) {
    data.hourly.forEach((hour) => {
      hour.dt = `${getExactHours(hour.dt as number)}`;
      hour.humidity = `${hour.humidity} %`;
      hour.temp = `${hour.temp} ºC`;
      hour.feels_like = `${hour.feels_like} ºC`;
      hour.uvi = `${(hour.uvi as number).toFixed(0)}`;
      data.current.dew_point = `${data.current.dew_point} ºC`;
      hour.visibility = `${convertToKm(hour.visibility as number)} km`;
      hour.pressure = `${hour.pressure} hPa`;
      hour.clouds = `${hour.clouds} %`;
      hour.wind_deg = `${getWindDir(
        hour.wind_deg as number
      )}`;
      hour.wind_speed = `${convertToKm(
        hour.wind_speed as number
      )} km/h`;
      if (hour.rain) {
        hour.rain["1h"] = `${hour.rain["1h"]} mm`;
        if (hour.rain["3h"])
          hour.rain["3h"] = `${hour.rain["3h"]} mm`;
      }
    })

  }
  if (data?.daily) {
      data.daily.forEach(day => {
        day.dt = `${getFormattedDate(day.dt as number)}`;
        day.humidity = `${day.humidity} %`;

        // temp array        
        day.temp.day = `${day.temp.day} ºC`;
        day.temp.eve = `${day.temp.eve} ºC`;
        day.temp.morn = `${day.temp.morn} ºC`;
        day.temp.min = `${day.temp.min} ºC`;
        day.temp.max = `${day.temp.max} ºC`;
        day.temp.night = `${day.temp.night} ºC`;     

        //feelsLike array
        day.feels_like.day = `${day.feels_like.day} ºC`;
        day.feels_like.eve = `${day.feels_like.eve} ºC`;
        day.feels_like.morn = `${day.feels_like.morn} ºC`;
        day.feels_like.night = `${day.feels_like.night} ºC`;     

        day.uvi = `${(day.uvi as number).toFixed(0)}`;
        day.dew_point = `${day.dew_point} ºC`;

        day.sunrise = `${getExactHours(
          day.sunrise as number
        )}`;
        day.sunset = `${getExactHours(day.sunset as number)}`;
        day.pressure = `${day.pressure} hPa`;
        day.clouds = `${day.clouds} %`;
        day.pop = `${day.pop*100} %`;
        day.wind_deg = `${getWindDir(
          day.wind_deg as number
        )}`;
        day.wind_speed = `${convertToKm(
          day.wind_speed as number
    )} km/h`;
        day.wind_gust = `${convertToKm(
          day.wind_gust as number
    )} km/h`;
        day.moonrise = `${getExactHours(day.moonrise as number)}`;
        day.moonset = `${getExactHours(day.moonset as number)}`;
    
    });
  }

  return data;  
}

export default dataFormatter