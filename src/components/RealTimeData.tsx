import { RealTimeDataProps } from "interfaces";
import getExactHours from "src/functions/getExactHour";

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow,
}) => {
  // console.log("realtime component called: ", apiData);

  return (
    <div>
      Current weather
      <div>{locationToShow}</div>
      <div>Clouds: {apiData.current.clouds}</div>
      <div>Dew Point: {apiData.current.dew_point}</div>
      <div>Updated at: {getExactHours(apiData.current.dt)}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>Pressure: {apiData.current.pressure}</div>
      <div>Sunrise: {apiData.current.sunrise}</div>
      <div>Sunset: {apiData.current.sunset}</div>
      <div>Temp: {apiData.current.temp}</div>
      <div>UVI: {apiData.current.uvi}</div>
      <div>Visibility: {apiData.current.visibility}</div>
      <div>Weather desc: {apiData.current.weather[0].description}</div>
      <div>Weather main desc: {apiData.current.weather[0].main}</div>
    </div>
  );
};

export default RealTimeData;
