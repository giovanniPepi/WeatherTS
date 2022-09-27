import { v4 } from "uuid";
import { DailyProps } from "interfaces";
import useClickOutside from "src/functions/useClickOutside";
import { motion } from "framer-motion";
import getWeatherIcon from "src/functions/getWeatherIcon";

const DailyData: React.FC<DailyProps> = ({ dailyData, setShowDailyModal }) => {
  //console.log("DAILY component called: ", dailyData);

  const domNode = useClickOutside(() => {
    setShowDailyModal(false);
  });

  return (
    <motion.div
      className="daily"
      /* style={{ backgroundImage: `url(${backgroundImg}) ` }} */
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
      }}
    >
      <section className="dailyDataOverlay">
        <div className="dailyDataModal" ref={domNode}>
          Daily forecast
          <ul>
            {dailyData.map((day) => {
              return (
                <li key={v4()}>
                  <div>Forecast for {day.dt}</div>
                  <div>Rain {day.pop}</div>
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
                  <div>{getWeatherIcon(day.weather[0].main)} {day.weather[0].description}</div>
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
    </motion.div>
  );
};

export default DailyData;
