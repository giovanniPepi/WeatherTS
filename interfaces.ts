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
  alerts: Ialerts[] | undefined;
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
  dt: number | string;
  sunrise: number | string;
  sunset: number | string;
  temp: number | string;
  feels_like: number | string;
  pressure: number | string;
  humidity: number | string;
  dew_point: number | string;
  uvi: number | string;
  clouds: number | string;
  visibility: number | string;
  wind_deg: number | string;
  wind_speed: number | string;
  rain: rainObj | undefined; 
  snow: rainObj | undefined;
  weather: CurrentWeather;
}

interface ICurrentWeatherArray {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IFeelsLikeDaily {
  day: number | string;
  night: number| string;
  eve: number| string; 
  morn: number| string;
}
 interface ITempDaily {
  day: number | string;
  min: number| string;
  max: number| string;  
  night: number| string;
  eve: number| string; 
  morn: number| string;
 }

interface IDailyWeather {
  dt: number| string;
  sunrise: number| string;
  sunset: number| string;
  moonrise: number| string;
  moonset: number| string;
  moon_phase: number| string;
  temp: ITempDaily;
  feels_like: IFeelsLikeDaily;
  pressure: number| string;
  humidity: number| string;
  dew_point: number| string;
  wind_speed: number| string;
  wind_deg: number | string;
  wind_gust: number | string;
  weather: CurrentWeather;
  clouds: number | string;
  pop: number | string;
  uvi: number | string;
}

interface IHourlyWeather {
  dt: (string | number)[];
  temp: number| string;
  feels_like: number| string;
  pressure: number| string;
  humidity: number| string;
  dew_point: number| string;
  uvi: number | string;
  clouds: number| string;
  visibility: number| string;
  wind_speed: number | string;
  wind_deg: number| string;
  wind_gust: number| string;
  weather: CurrentWeather;
  pop: number| string;

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

interface HourlyProps {
  hourlyData: HourlyArray | undefined;
  setShowHourlyModal: StateChanger;
  night: boolean;
  UIColor: string;
  modalUIColor: string;
  moonPhase: number
  svgColors: string;
  hoursToRender: number;
  boxShadow: string
}

interface DailyProps {
  dailyData: DailyArray | undefined;
  setShowDailyModal: StateChanger;
    night: boolean;
  UIColor: string;
  modalUIColor: string;
  moonPhase: number;
  svgColors: string;
  separatorColor: string;
  daysToRender: number;
  boxShadow: string
}

interface RealTimeDataProps {
  apiData: IWeatherData;
  locationToShow: string;
  loading: boolean;
  night: boolean;
  moonPhase: number;
  svgColors: string;
  UIColor: string;
  modalUIColor: string;
  separatorColor: string;
  boxShadow: string;
  setShouldReloadAPI: StateChangerB;
  isClosedSearch: boolean,
  setIsClosedSearch: StateChangerB,
  setIsOpenedSearch: StateChangerB;
  minuterain: number;
}

interface AlertsModalProps {
  apiData: IWeatherData;
  setShowAlertsModal: StateChanger;
  UIColor: string;
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
  time: string;
}
interface ITitleAnimation {
  title: string;
  UIColor: string;
}

interface ISvgColors {
  svgColors: string;
}


type CurrentWeather = ICurrentWeatherArray[];
type Daily = IDailyWeather[];
type Minutely = Iminutely[] | undefined;
type HourlyArray = IHourlyWeather[];
type DailyArray = IDailyWeather[];
type StateChanger = Dispatch<SetStateAction<Boolean>>;
type StateChangerB = Dispatch<SetStateAction<boolean>>;

export type {
  IWeatherData,
  HourlyProps, DailyProps, IGeoApiCall, RealTimeDataProps
, ExtendedRealTimeDataProps, NightProps, AlertsModalProps, HourlyArray, DailyArray, Ititle, ITitleAnimation, ICurrentWeatherArray, ISvgColors, Minutely
}  

