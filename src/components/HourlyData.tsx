import { v4 } from 'uuid';
import { HourlyProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import Temperature from 'src/icons/Temperature';
import FeelsLike from 'src/icons/FeelsLike';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import Clouds from 'src/icons/Clouds';
import DewPoint from 'src/icons/DewPoint';
import Pressure from 'src/icons/Pressure';
import Visibility from 'src/icons/Visibility';

const HourlyData: React.FC<HourlyProps> = ({
  hourlyData,
  setShowHourlyModal
}) => {
  //  console.log("hourlyData component called: ", hourlyData);

  const domNode = useClickOutside(() => {
    setShowHourlyModal(false);
  });

  return (
    <section className="hourlyDataOverlay">
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
        <div className="hourlyDataModal" ref={domNode}>
          <h1>Hourly Forecast</h1>
          <ul className="hourlyUl">
            {hourlyData.map((hour) => {
              return (
                <li key={v4()} className="hourlyContainer">
                  <div className="hourlyDt">{hour.dt}</div>
                  <div>
                    {getWeatherIcon(hour.weather[0].main)}
                    {hour.weather[0].main}
                  </div>
                  <div></div>
                  <Temperature /> {hour.temp}
                  <div>
                    <Humidity /> {hour.humidity}
                  </div>
                  <div>
                    <UVI /> {hour.uvi}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default HourlyData;
