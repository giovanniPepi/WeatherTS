interface IWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: string;
  current: Object;
  minutely: Object;
  hourly: Object;
  daily: Object;
}

export type {
  IWeatherData
}  

