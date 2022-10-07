import '../css/HourlyData.css';
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
import NetworkError from 'src/icons/NetworkError';
import getForecastHourNight from 'src/functions/getForecastHourNight';

const HourlyData: React.FC<HourlyProps> = ({
  hourlyData,
  setShowHourlyModal,
  night,
  moonPhase,
  svgColors,
  modalUIColor,
  hoursToRender,
  boxShadow
}) => {
  //state
  const [index, setIndex] = useState(hoursToRender);
  const [renderedItems, setRenderedItems] = useState<HourlyArray>(
    hourlyData!
  );
  const [start, setStart] = useState(0);

  const getNextHours = () => {
    if (start > index || start > index - hoursToRender) setStart(40);
    if (index > 48) setIndex(48);
    if (index < 48 || start < 48 - hoursToRender) {
      setIndex(index + hoursToRender);
      setStart(start + hoursToRender);
    }
  };

  const getPreviousHours = () => {
    if (start < index - hoursToRender) setStart(0);
    if (index < start || index < hoursToRender) setIndex(hoursToRender);
    if (index > hoursToRender || start > 0) {
      setStart(start - hoursToRender);
      setIndex(index - hoursToRender);
    }
  };

  const getItemsToRender = () => {
    const newRender: HourlyArray = hourlyData!.slice(start, index);
    setRenderedItems(newRender);
  };

  useEffect(() => {
    getItemsToRender();
  }, [hourlyData, index, start, hoursToRender]);

  if (hourlyData === undefined) {
    return (
      <motion.div
        className="realTimeData"
        initial={{ opacity: 0 }}
        style={{
          backgroundColor: modalUIColor,
          boxShadow: boxShadow
        }}
        animate={{
          opacity: 1
        }}
        transition={{ duration: 2 }}
        exit={{
          opacity: 0,
          x: window.innerWidth
        }}
      >
        <NetworkError svgColors={svgColors} />
        <div>
          Couldn't get API data. Check your connection or try again later.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="hourlyDataModal"
      initial={{ opacity: 0 }}
      style={{ backgroundColor: modalUIColor }}
      animate={{
        opacity: 1
      }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        x: window.innerWidth
      }}
    >
      <div className="hourlyMainTitle">
        <button onClick={() => getPreviousHours()}>
          <Previous svgColors={svgColors} />
        </button>
        <div>Hourly Forecast</div>
        <button onClick={() => getNextHours()}>
          <Next svgColors={svgColors} />
        </button>
      </div>
      <ul className="hourlyUl">
        {renderedItems.map((hour) => {
          return (
            <li key={v4()} className="hourlyContainer">
              <div className="hourlyDt">{hour.dt[1]}</div>

              <div className="hourlyDataDiv minorHourly">
                {getWeatherIcon(
                  hour.weather[0].main,
                  getForecastHourNight(hour.dt[0] as number),
                  moonPhase,
                  svgColors
                )}
                <div>{hour.weather[0].main}</div>
              </div>
              <div className="hourlyDataDiv minorHourly">
                <Temperature svgColors={svgColors} />
                {hour.temp}
              </div>
              <div className="hourlyDataDiv minorHourly">
                <Humidity svgColors={svgColors} /> {hour.humidity}
              </div>
              {typeof hour.uvi === 'string' ? (
                <div className="hourlyDataDiv">
                  <UVI svgColors={svgColors} />
                  <div className=" uvHourly">{hour.uvi}</div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default HourlyData;
