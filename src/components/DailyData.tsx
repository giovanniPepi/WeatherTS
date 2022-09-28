import { v4 } from 'uuid';
import { DailyProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';

const DailyData: React.FC<DailyProps> = ({
  dailyData,
  setShowDailyModal
}) => {
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
        opacity: 1
      }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        x: window.innerWidth
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
                  <div>
                    {getWeatherIcon(day.weather[0].main)}{' '}
                    {day.weather[0].description}
                  </div>
                  <div>
                    Temperature
                    {/* Conditional rendering to avoid empty when the api doesn't provide values*/}
                    {day.temp.morn ? (
                      <div>
                        Morning: {day.temp.morn}
                        {day.feels_like.morn ? (
                          <> Feels Like {day.feels_like.morn}</>
                        ) : null}
                      </div>
                    ) : null}
                    {day.temp.day ? (
                      <div>
                        Day: {day.temp.day}
                        {day.feels_like.day ? (
                          <> Feels Like {day.feels_like.day}</>
                        ) : null}
                      </div>
                    ) : null}
                    {day.temp.eve ? (
                      <div>
                        Evening: {day.temp.eve}
                        {day.feels_like.eve ? (
                          <> Feels Like {day.feels_like.eve}</>
                        ) : null}
                      </div>
                    ) : null}
                    {day.temp.night ? (
                      <div>
                        Night: {day.temp.night}
                        {day.feels_like.night ? (
                          <> Feels Like {day.feels_like.night}</>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div>Humidity: {day.humidity}</div>
                  <div>UVI {day.uvi}</div>
                  <div>
                    Wind deg: {day.wind_deg}
                    Wind gust: {day.wind_gust}
                    Wind speed: {day.wind_speed}
                  </div>
                  <div>Clouds: {day.clouds}</div>
                  <div>Dew Point: {day.dew_point}</div>
                  <div>Pressure: {day.pressure}</div>
                  <div>Rain {day.pop}</div>
                  <div>Sunrise: {day.sunrise}</div>
                  <div>Sunset: {day.sunset}</div>
                  <div>Moon Phase: {day.moon_phase}</div>
                  <div>Moonrise: {day.moonrise}</div>
                  <div>Moonset: {day.moonset}</div>
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
