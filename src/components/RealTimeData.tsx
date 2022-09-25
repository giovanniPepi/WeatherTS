import { apiDataProps } from "interfaces";

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<apiDataProps> = ({ apiData }) => {
  console.log("realtime component called: ", apiData);

  return (
    <div>
      Current weather
      <div>
        Location: {apiData.lon}
        {apiData.lat}
      </div>
      <div>Clouds: {apiData.current.clouds}</div>
      <div>Dew Point: {apiData.current.dew_point}</div>
      <div>Dt: {apiData.current.dt}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>Pressure: {apiData.current.pressure}</div>
      <div>Sunrise: {apiData.current.sunrise}</div>
      <div>Sunset: {apiData.current.sunset}</div>
      <div>Temp: {apiData.current.temp}</div>
      <div>UVI: {apiData.current.uvi}</div>
      <div>Visibility: {apiData.current.visibility}</div>
      <div>Weather desc: {apiData.current.weather[0].description}</div>
      <div>Weather id: {apiData.current.weather[0].id}</div>
      <div>Weather main: {apiData.current.weather[0].main}</div>
    </div>
  );
};

export default RealTimeData;
