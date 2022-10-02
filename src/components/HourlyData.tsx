import { v4 } from 'uuid';
import { HourlyArray, HourlyProps } from 'interfaces';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import Temperature from 'src/icons/Temperature';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import { useEffect, useState } from 'react';
import Next from 'src/icons/Next';
import Previous from 'src/icons/Previous';

const HourlyData: React.FC<HourlyProps> = ({
  hourlyData,
  setShowHourlyModal,
  night
}) => {
  //state
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
      setStart(start - 8);
      setIndex(index - 8);
    }
  };

  const getItemsToRender = () => {
    const newRender: HourlyArray = hourlyData.slice(start, index);
    setRenderedItems(newRender);
  };

  useEffect(() => {
    getItemsToRender();
  }, [index, start]);

  return (
    <motion.div
      className="hourlyDataModal"
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
      <div className="hourlyMainTitle">Hourly Forecast</div>
      <div className="hourlyControlDiv">
        <button onClick={() => getPreviousHours()}>
          <Previous />
        </button>
        <ul className="hourlyUl">
          {renderedItems.map((hour) => {
            return (
              <li key={v4()} className="hourlyContainer">
                <div className="hourlyDt">{hour.dt}</div>
                <div className="hourlyDataDiv">
                  {getWeatherIcon(hour.weather[0].main, night)}
                  <div>{hour.weather[0].main}</div>
                </div>
                <div className="hourlyDataDiv">
                  <Temperature />
                  {hour.temp}
                </div>
                <div className="hourlyDataDiv">
                  <Humidity /> {hour.humidity}
                </div>
                <div className="hourlyDataDiv">
                  <UVI /> {hour.uvi}
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={() => getNextHours()}>
          <Next />
        </button>
      </div>
    </motion.div>
  );
};

export default HourlyData;
