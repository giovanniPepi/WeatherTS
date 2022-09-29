import { v4 } from 'uuid';
import { HourlyArray, HourlyProps, IWeatherData } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import Temperature from 'src/icons/Temperature';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import { useEffect, useState } from 'react';

const HourlyData: React.FC<HourlyProps> = ({
  hourlyData,
  setShowHourlyModal
}) => {
  // click outside
  const domNode = useClickOutside(() => {
    setShowHourlyModal(false);
  });

  const [index, setIndex] = useState(8);
  const [renderedItems, setRenderedItems] =
    useState<HourlyArray>(hourlyData);
  const [start, setStart] = useState(0);

  const getNextHours = () => {
    if (start > index || start > index - 8) setStart(40);
    if (index > 48) setIndex(48);
    if (index < 48 || start < 40) {
      setIndex(index + 8);
      setStart(start + 8);
    }
  };

  const getPreviousHours = () => {
    if (start < index - 8) setStart(0);
    if (index < start || index < 8) setIndex(8);
    if (index > 8 || start > 0) {
      console.log('fuck');
      setStart(start - 8);
      setIndex(index - 8);
    }
  };

  const getItemsToRender = () => {
    const newRender: HourlyArray = hourlyData.slice(start, index);
    setRenderedItems(newRender);
  };

  useEffect(() => {
    console.log(start, index);
    getItemsToRender();
  }, [index, start]);

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
            {renderedItems.map((hour) => {
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
          <button onClick={() => getPreviousHours()}>
            Previous 8 hours
          </button>
          <button onClick={() => getNextHours()}>Next 8 hours</button>
        </div>
      </motion.div>
    </section>
  );
};

export default HourlyData;
