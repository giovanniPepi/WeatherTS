import { v4 } from "uuid";
import { HourlyProps } from "interfaces";
import getExactHours from "src/functions/getExactHour";
import getFormattedDate from "src/functions/getFormattedDate";
import useClickOutside from "src/functions/useClickOutside";

const HourlyData: React.FC<HourlyProps> = ({
  hourlyData,
  setShowHourlyModal,
}) => {
  //  console.log("hourlyData component called: ", hourlyData);

  const domNode = useClickOutside(() => {
    setShowHourlyModal(false);
  });

  return (
    <section className="hourlyDataOverlay">
      <div className="hourlyDataModal" ref={domNode}>
        Hourly Data
        <ul>
          {hourlyData.map((hour) => {
            return (
              <li key={v4()}>
                <div>
                  Forecast for{" "}
                  {`${getExactHours(hour.dt)} - ${getFormattedDate(hour.dt)}`}
                </div>
                <div>Clouds: {hour.clouds}</div>
                <div>Dew Point: {hour.dew_point}</div>
                <div>Feels_like: {hour.feels_like}</div>
                <div>Humidity: {hour.humidity}</div>
                <div>Pressure: {hour.pressure}</div>
                <div>Temp: {hour.temp}</div>
                <div>UVI: {hour.uvi}</div>
                <div>Visibility: {hour.visibility}</div>
                <div>Weather desc: {hour.weather[0].description}</div>
                <div>Weather id: {hour.weather[0].id}</div>
                <div>Weather main: {hour.weather[0].main}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HourlyData;
