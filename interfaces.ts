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
  alerts: Ialerts[];
}

interface Ialerts {
  description: string;
  end: number;
  event: string;
  sender_name: string;
  start: number;
  tags: string[];
}

interface IWeatherDataCurrent {
  clouds: number | string;
  dew_point: number | string;
  dt: number | string;
  feels_like: number | string;
  humidity: number | string;
  pressure: number | string;
  rain: rainObj | undefined; 
  snow: rainObj | undefined;
  sunrise: number | string;
  sunset: number | string;
  temp: number | string;
  uvi: number | string;
  visibility: number | string;
  weather: CurrentWeather;
  wind_deg: number | string;
  wind_speed: number | string;
}

interface ICurrentWeatherArray {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IFeelsLikeDaily {
  day: number | string;
  night: number| string;
  eve: number| string; 
  morn: number| string;
}
 interface ITempDaily {
  day: number | string;
  night: number| string;
  eve: number| string; 
   morn: number| string;
   min: number| string;
   max: number| string;
 }

interface IDailyWeather {
  clouds: number | string;
  dew_point: number| string;
  dt: number| string;
  feels_like: IFeelsLikeDaily;
  humidity: number| string;
  pressure: number| string;
  moon_phase: number| string;
  moonrise: number| string;
  moonset: number| string;
  sunrise: number| string;
  sunset: number| string;
  temp: ITempDaily;
  uvi: number | string;
  visibility: number;
  weather: CurrentWeather;
  wind_deg: number | string;
  wind_speed: number| string;
  wind_gust: number | string;
  rain: number | string;
  snow: number | string;
  pop: number | string;


}

interface IHourlyWeather {
  clouds: number| string;
  dew_point: number| string;
  dt: number| string;
  feels_like: number| string;
  humidity: number| string;
  pop: number| string;
  pressure: number| string;
  temp: number| string;
  uvi: number | string;
  visibility: number| string;
  weather: CurrentWeather;
  wind_deg: number| string;
  wind_gust: number| string;
  wind_speed: number | string;
  rain: rainObj | undefined; 
  snow: rainObj | undefined;

}

interface IGeoApiCall  {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;

}

interface Iminutely {
  dt: number | string;
  precipitation: number | string;
}

interface MinutelyProps {
  minuteData: Minutely;
  setShowMinutelyModal: StateChanger;
  }

interface MinutelyChartProps {
  minuteData: Minutely;
}

interface HourlyProps {
  hourlyData: HourlyArray;
  setShowHourlyModal: StateChanger;
}

interface DailyProps {
  dailyData: DailyArray;
  setShowDailyModal: StateChanger;
}

interface RealTimeDataProps {
  apiData: IWeatherData;
  locationToShow: string;
}


interface AlertsModalProps {
  apiData: IWeatherData;
  setShowAlertsModal: StateChanger
}

interface ExtendedRealTimeDataProps {
  apiData: IWeatherData;
  locationToShow: string;
  setShowExtendedCurrentWeather: StateChangerB;
}

interface rainObj {
  '1h': number | string | undefined;
  '3h': number | string | undefined;
}

interface NightProps {
  night: Boolean;
}

interface Ititle {
  title: string;
}

type CurrentWeather = ICurrentWeatherArray[];
type Daily = IDailyWeather[];
type Minutely = Iminutely[];
type HourlyArray = IHourlyWeather[];
type DailyArray = IDailyWeather[];
type StateChanger = Dispatch<SetStateAction<Boolean>>;
type StateChangerB = Dispatch<SetStateAction<boolean>>;

export type {
  IWeatherData,
  MinutelyProps,
  HourlyProps, DailyProps, IGeoApiCall, RealTimeDataProps
, ExtendedRealTimeDataProps, NightProps, AlertsModalProps, MinutelyChartProps, HourlyArray, DailyArray, Ititle
}  

