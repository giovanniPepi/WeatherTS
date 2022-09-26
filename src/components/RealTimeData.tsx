import { RealTimeDataProps } from "interfaces";
import convertToKm from "src/functions/convertToKm";
import getExactHours from "src/functions/getExactHour";

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow,
}) => {
  // console.log("realtime component called: ", apiData);

  return (
    <section className="realTimeData">
      <div>Updated at: {getExactHours(apiData.current.dt)}</div>
      <div>{locationToShow}</div>
      <div>{apiData.current.weather[0].description}</div>
      <div>Temp: {apiData.current.temp}</div>
      <div>Feels_like: {apiData.current.feels_like} ºC</div>
      <div>UV: {apiData.current.uvi}</div>
      <div>Clouds: {apiData.current.clouds} %</div>
      <div>Dew Point: {apiData.current.dew_point} ºC</div>
      <div>Humidity: {apiData.current.humidity} %</div>
      <div>Pressure: {apiData.current.pressure} hPa</div>
      <div>Sunrise: {getExactHours(apiData.current.sunrise)}</div>
      <div>Sunset: {getExactHours(apiData.current.sunset)}</div>
      <div>Visibility: {apiData.current.visibility / 1000} km</div>
      <div>Wind direction: {apiData.current.wind_deg}</div>
      <div>Wind speed: {convertToKm(apiData.current.wind_speed)} km/h</div>
    </section>
  );
};

export default RealTimeData;
