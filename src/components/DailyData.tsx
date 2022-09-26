import { v4 } from "uuid";
import { DailyProps } from "interfaces";
import getFormattedDate from "src/functions/getFormattedDate";
import useClickOutside from "src/functions/useClickOutside";

const DailyData: React.FC<DailyProps> = ({ dailyData, setShowDailyModal }) => {
  //console.log("DAILY component called: ", dailyData);

  const domNode = useClickOutside(() => {
    setShowDailyModal(false);
  });

  return (
    <section className="dailyDataOverlay">
      <div className="dailyDataModal" ref={domNode}>
        Daily forecast
        <ul>
          {dailyData.map((day) => {
            return (
              <li key={v4()}>
                <div>Forecast for {getFormattedDate(day.dt)}</div>
                <div>Clouds: {day.clouds}</div>
                <div>Dew Point: {day.dew_point}</div>
                <div>
                  Feels_like: Day: {day.feels_like.day}
                  Eve: {day.feels_like.eve}
                  Morn: {day.feels_like.morn}
                  Night: {day.feels_like.night}
                </div>
                <div>Humidity: {day.humidity}</div>
                <div>Moon Phase: {day.moon_phase}</div>
                <div>Moonrise: {day.moonrise}</div>
                <div>Moonset: {day.moonset}</div>
                <div>Pressure: {day.pressure}</div>
                <div>Sunrise: {day.sunrise}</div>
                <div>Sunset: {day.sunset}</div>
                <div>
                  Morn: {day.temp.morn}
                  Day: {day.temp.day}
                  Eve: {day.temp.eve}
                  Night: {day.temp.night}
                  Max: {day.temp.max}
                  Min: {day.temp.min}
                </div>
                <div>UVI: {day.uvi}</div>
                <div>Weather desc: {day.weather[0].description}</div>
                <div>Weather main desc: {day.weather[0].main}</div>{" "}
                <div>
                  Wind deg: {day.wind_deg}
                  Wind gust: {day.wind_gust}
                  Wind speed: {day.wind_speed}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default DailyData;
