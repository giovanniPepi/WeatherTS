import { Dispatch, SetStateAction } from "react";

interface IWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: IWeatherDataCurrent;
  minutely: Minutely;
  hourly: HourlyArray;
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
  weather: CurrentWeather;
  wind_deg: number;
  wind_speed: number;
}

interface ICurrentWeatherArray {
  description: string;
  icon: string;
  id: number;
  main: string;
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
  weather: CurrentWeather;
  wind_deg: number;
  wind_speed: number;
  wind_gust: number;
}

interface IHourlyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: CurrentWeather;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface IGeoApiCall  {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

interface Iminutely {
  dt: number;
  precipitation: number;
}

interface MinutelyProps {
  minuteData: Minutely;
  setShowMinutelyModal: Dispatch<SetStateAction<Boolean>>;
}

interface HourlyProps {
  hourlyData: HourlyArray;
}

interface DailyProps {
  dailyData: DailyArray;
}

interface RealTimeDataProps {
  apiData: IWeatherData;
  locationToShow: string;
}


type CurrentWeather = ICurrentWeatherArray[];
type Daily = IDailyWeather[];
type Minutely = Iminutely[];
type HourlyArray = IHourlyWeather[];
type DailyArray = IDailyWeather[];


export type {
  IWeatherData,
  MinutelyProps,
  HourlyProps, DailyProps, IGeoApiCall, RealTimeDataProps
}  

