import { IWeatherData } from 'interfaces';

const getInitialAPIData = (): IWeatherData => {
  const initialObj = {
    lat: 0,
    lon: 0,
    timezone: 'America/Sao_Paulo',
    timezone_offset: 0,
    current: {
      dt: 0,
      sunrise: 0,
      sunset: 0,
      temp: 25,
      feels_like: 24,
      pressure: 0,
      humidity: 38,
      dew_point: 0,
      uvi: 5,
      clouds: 0,
      visibility: 0,
      wind_speed: 10,
      wind_deg: 0,
      weather: [
        { id: 0, main: 'Clear', description: 'céu limpo', icon: '' }
      ],
      rain: undefined,
      snow: undefined
    },
    minutely: [{ dt: 0, precipitation: 0 }],
    hourly: [
      {
        dt: [0, 0],
        temp: 0,
        feels_like: 0,
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        uvi: 0,
        clouds: 0,
        visibility: 0,
        wind_speed: 0,
        wind_deg: 0,
        wind_gust: 0,
        weather: [
          {
            id: 801,
            main: '',
            description: '',
            icon: ''
          }
        ],
        pop: 0
      }
    ],
    daily: [
      {
        dt: 0,
        sunrise: 0,
        sunset: 0,
        moonrise: 0,
        moonset: 0,
        moon_phase: 0,
        temp: {
          day: 0,
          min: 0,
          max: 0,
          night: 0,
          eve: 0,
          morn: 0
        },
        feels_like: { day: 0, night: 0, eve: 0, morn: 0 },
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        wind_speed: 0,
        wind_deg: 0,
        wind_gust: 0,
        weather: [{ id: 0, main: '', description: '', icon: '' }],
        clouds: 0,
        pop: 0,
        uvi: 0
      }
    ],
    alerts: undefined
  };

  return initialObj;
};

export default getInitialAPIData;
