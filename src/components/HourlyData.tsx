import { v4 } from 'uuid';
import { HourlyProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';

const HourlyData: React.FC<HourlyProps> = ({
  hourlyData,
  setShowHourlyModal
}) => {
  //  console.log("hourlyData component called: ", hourlyData);

  const domNode = useClickOutside(() => {
    setShowHourlyModal(false);
  });

  return (
    <motion.div
      className="hourly"
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
      <section className="hourlyDataOverlay">
        <div className="hourlyDataModal" ref={domNode}>
          Hourly Forecast
          <ul>
            {hourlyData.map((hour) => {
              return (
                <li key={v4()}>
                  <div>{hour.dt}</div>
                  <div>{getWeatherIcon(hour.weather[0].main)}</div>
                  <div>{hour.weather[0].description}</div>
                  <div>Temp: {hour.temp}</div>
                  <div>Feels_like: {hour.feels_like}</div>
                  <div>Humidity: {hour.humidity}</div>
                  <div>UVI: {hour.uvi}</div>
                  <div>Clouds: {hour.clouds}</div>
                  <div>Dew Point: {hour.dew_point}</div>
                  <div>Pressure: {hour.pressure}</div>
                  <div>Visibility: {hour.visibility}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </motion.div>
  );
};

export default HourlyData;
