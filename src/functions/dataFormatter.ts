import { IWeatherData } from "interfaces";
import capitalizeFirst from "./capitalizeFirst";
import convertToKm from "./convertToKm";
import getExactHours from "./getExactHours";
import getFormattedDate from "./getFormattedDate";
import getHour from "./getHour";
import getUVSeverity from "./getUVSeverity";
import getWindDir from "./getWindDir";

const dataFormatter = (data: IWeatherData | undefined) => {
  
  if (data?.current) {

      /*format to check UV*/ 
    const exactHour = getHour(data.timezone);
    
    data.current.weather[0]['description'] = `${capitalizeFirst(data.current.weather[0]['description'] as string)}`;

    data.current.humidity = `${(data?.current.humidity as number).toFixed(0)} %`;
    data.current.temp = `${(data.current.temp as number).toFixed(1)} ºC`;
    data.current.feels_like = `${(data.current.feels_like as number).toFixed(1)} ºC`;

    // return UV only at sunlight
    if (exactHour >= 5 && exactHour <= 19)        
      data.current.uvi = `${(data.current.uvi as number).toFixed(0)} ${getUVSeverity(data.current.uvi as number)}`;        

    data.current.dew_point = `${(data.current.dew_point as number).toFixed(1)} ºC`;
    data.current.visibility = `${(data.current.visibility as number)/1000} km`;
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
      /*format to check UV*/ 
      const exactHour = new Date(hour.dt as unknown as number * 1000).getHours();
      
      hour.dt = [hour.dt as unknown as number, `${getFormattedDate(hour.dt as unknown as number)} ${getExactHours(hour.dt as unknown as number)}`];
      hour.weather[0]['description'] = `${capitalizeFirst(hour.weather[0]['description'] as string)}`;      
      hour.pop = `${(hour.pop as number * 100).toFixed(0)}%`
      hour.humidity = `${(hour.humidity as number).toFixed(0)} %`;
      hour.temp = `${(hour.temp as number).toFixed(1)} ºC`;
      hour.feels_like = `${(hour.feels_like as number).toFixed(1)} ºC`;

      /*only return UV at day*/ 
        hour.uvi = `${(hour.uvi as number).toFixed(0)} ${getUVSeverity
          (hour.uvi as number)}`;     
      hour.dew_point = `${hour.dew_point} ºC`;
      hour.visibility = `${(hour.visibility as number) / 1000} km`;
      hour.pressure = `${hour.pressure} hPa`;
      hour.clouds = `${hour.clouds} %`;
      hour.wind_deg = `${getWindDir(
        hour.wind_deg as number
      )}`;
      hour.wind_speed = `${convertToKm(
        hour.wind_speed as number
      )} km/h`;

      hour.wind_gust = `${convertToKm(
        hour.wind_gust as number
      )} km/h`;
    })

  }
  if (data?.daily) {
      data.daily.forEach(day => {
        day.dt = `${getFormattedDate(day.dt as number)}`;
        day.humidity = `${(day.humidity as number).toFixed(0)} %`;      
        
        // temp obj
        const temps = Object.values(day.temp);
        const formattedTemps: string[] = []
        temps.forEach((temp) => {
          // fix to 1 decimal
          formattedTemps.push(`${(temp as number).toFixed(1)} ºC`);
        })
        const newTempObj = {
          day: formattedTemps[0],
          min: formattedTemps[1],
          max: formattedTemps[2],
          night: formattedTemps[3],
          eve: formattedTemps[4],
          morn: formattedTemps[5]
        }
        day.temp = newTempObj;

        // capitalize first
        day.weather[0]["description"] = `${capitalizeFirst(day.weather[0]["description"] as string)}`;

 day.uvi = `${(day.uvi as number).toFixed(0)} ${getUVSeverity
        (day.uvi as number)}`;

        day.sunrise = `${getExactHours(
        day.sunrise as number
        )}`;
        day.sunset = `${getExactHours(day.sunset as number)}`;
        day.clouds = `${day.clouds} %`;
        day.pop = `${(day.pop as number * 100).toFixed(0)} %`;
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