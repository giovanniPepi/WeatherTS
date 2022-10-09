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
    minutely: [{"dt":1665273240,"precipitation":2.8188},{"dt":1665273300,"precipitation":2.734},{"dt":1665273360,"precipitation":2.6608},{"dt":1665273420,"precipitation":2.5876},{"dt":1665273480,"precipitation":2.5144},{"dt":1665273540,"precipitation":2.4412},{"dt":1665273600,"precipitation":2.368},{"dt":1665273660,"precipitation":2.3044},{"dt":1665273720,"precipitation":2.2408},{"dt":1665273780,"precipitation":2.1772},{"dt":1665273840,"precipitation":2.1136},{"dt":1665273900,"precipitation":2.05},{"dt":1665273960,"precipitation":1.9952},{"dt":1665274020,"precipitation":1.9404},{"dt":1665274080,"precipitation":1.8856},{"dt":1665274140,"precipitation":1.8308},{"dt":1665274200,"precipitation":1.776},{"dt":1665274260,"precipitation":1.7284},{"dt":1665274320,"precipitation":1.6808},{"dt":1665274380,"precipitation":1.6332},{"dt":1665274440,"precipitation":1.5856},{"dt":1665274500,"precipitation":1.538},{"dt":1665274560,"precipitation":1.538},{"dt":1665274620,"precipitation":1.538},{"dt":1665274680,"precipitation":1.538},{"dt":1665274740,"precipitation":1.538},{"dt":1665274800,"precipitation":1.538},{"dt":1665274860,"precipitation":1.538},{"dt":1665274920,"precipitation":1.538},{"dt":1665274980,"precipitation":1.538},{"dt":1665275040,"precipitation":1.538},{"dt":1665275100,"precipitation":1.538},{"dt":1665275160,"precipitation":1.538},{"dt":1665275220,"precipitation":1.538},{"dt":1665275280,"precipitation":1.538},{"dt":1665275340,"precipitation":1.538},{"dt":1665275400,"precipitation":1.538},{"dt":1665275460,"precipitation":1.5856},{"dt":1665275520,"precipitation":1.6332},{"dt":1665275580,"precipitation":1.6808},{"dt":1665275640,"precipitation":1.7284},{"dt":1665275700,"precipitation":1.776},{"dt":1665275760,"precipitation":1.776},{"dt":1665275820,"precipitation":1.776},{"dt":1665275880,"precipitation":1.776},{"dt":1665275940,"precipitation":1.776},{"dt":1665276000,"precipitation":1.776},{"dt":1665276060,"precipitation":1.7284},{"dt":1665276120,"precipitation":1.6808},{"dt":1665276180,"precipitation":1.6332},{"dt":1665276240,"precipitation":1.5856},{"dt":1665276300,"precipitation":1.538},{"dt":1665276360,"precipitation":1.4968},{"dt":1665276420,"precipitation":1.4556},{"dt":1665276480,"precipitation":1.4144},{"dt":1665276540,"precipitation":1.3732},{"dt":1665276600,"precipitation":1.332},{"dt":1665276660,"precipitation":1.2962},{"dt":1665276720,"precipitation":1.2604},{"dt":1665276780,"precipitation":1.2246},{"dt":1665276840,"precipitation":1.1888}],
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
