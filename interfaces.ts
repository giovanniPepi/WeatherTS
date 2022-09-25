interface IWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: IWeatherDataCurrent;
  minutely: Minutely;
  hourly: IHourlyWeather;
  daily: Daily;
  alerts: Ialerts;
}

interface Ialerts {
  description: string | null;
  end: number | null;
  event: string | null;
  sender_name: string | null;
  start: number | null;
  tags: string[] | null;
}

interface apiDataProps {
  apiData: IWeatherData;
}

interface IWeatherDataCurrent {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: ICurrentWeatherArray;
  wind_deg: number;
  wind_speed: number;
}

interface ICurrentWeatherArray {
  id: number;
  main: string;
  description: string;
}

interface IFeelsLikeDaily {
  day: number;
  night: number;
  eve: number; 
  morn: number;
}
 interface ITempDaily {
  day: number;
  night: number;
  eve: number; 
   morn: number;
   min: number;
   max: number;
 }

interface IDailyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: IFeelsLikeDaily;
  humidity: number;
  pressure: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  sunrise: number;
  sunset: number;
  temp: ITempDaily;
  uvi: number;
  visibility: number;
  weather: ICurrentWeatherArray;
  wind_deg: number;
  wind_speed: number;
  wind_gust: number;
}

interface IHourlyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidty: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: ICurrentWeatherArray;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface Iminutely {
  dt: number;
  precipitation: number;
}

type Daily = IDailyWeather[];
type Minutely = Iminutely[];

export type {
  IWeatherData,
  apiDataProps,
}  

