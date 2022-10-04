import { v4 } from 'uuid';
import { DailyArray, DailyProps } from 'interfaces';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import { useEffect, useState } from 'react';
import FeelsLike from 'src/icons/FeelsLike';
import Temperature from 'src/icons/Temperature';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import Clouds from 'src/icons/Clouds';
import Previous from 'src/icons/Previous';
import Next from 'src/icons/Next';
import DewPoint from 'src/icons/DewPoint';
import Pressure from 'src/icons/Pressure';
import getMoonPhase from 'src/functions/getMoonPhase';
import Sunny from 'src/icons/Sunny';
import Windy from 'src/icons/Windy';
import Rain from 'src/icons/Rain';
import Percent from 'src/icons/Percent';
import NetworkError from 'src/icons/NetworkError';
import { Tooltip } from '@material-ui/core';

const DailyData: React.FC<DailyProps> = ({
  dailyData,
  setShowDailyModal,
  night,
  moonPhase,
  svgColors,
  modalUIColor,
  separatorColor
}) => {
  //state
  const [index, setIndex] = useState(1);
  const [renderedItems, setRenderedItems] =
    useState<DailyArray>(dailyData);
  const [start, setStart] = useState(0);
  const [daysToShow, setDaysToShow] = useState(1);

  const getNextDays = () => {
    if (start > index || start > index - daysToShow) setStart(0);
    if (index > 8) setIndex(8);
    if (index < 8 || start < 8 - daysToShow) {
      setIndex(index + daysToShow);
      setStart(start + daysToShow);
    }
  };

  const getPreviousDays = () => {
    if (start < index - daysToShow) setStart(0);
    if (index < start || index < daysToShow) setIndex(daysToShow);
    if (index > daysToShow || start > 0) {
      setStart(start - daysToShow);
      setIndex(index - daysToShow);
    }
  };

  useEffect(() => {
    if (window.screen.availWidth > 749) {
      setDaysToShow(2);
    } else if (window.screen.availWidth < 750) {
      setDaysToShow(1);
    }

    const getItemsToRender = () => {
      const newRender: DailyArray = dailyData.slice(start, index);
      setRenderedItems(newRender);
    };

    getItemsToRender();
  }, [dailyData, daysToShow, start, index]);

  if (dailyData === undefined) {
    return (
      <motion.div
        className="realTimeData"
        initial={{ opacity: 0 }}
        style={{ backgroundColor: modalUIColor }}
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
          Couldn't get API data. Check your connection or try again
          later.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="dailyDataModal"
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
      <div className="dailyMainTitle">Daily forecast</div>
      <div className="dailyControlDiv">
        <button onClick={() => getPreviousDays()}>
          <Previous svgColors={svgColors} />
        </button>

        <ul className="dailyUl">
          {renderedItems.map((day) => {
            return (
              <li key={v4()} className="dailyContainer">
                <div className="dailyDt">
                  <div>{day.dt}</div>
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  {getWeatherIcon(
                    day.weather[0].main,
                    false,
                    day.moon_phase as number,
                    svgColors
                  )}
                  {day.weather[0].description}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <Tooltip title="Rain probability">
                    <div className="rainPercentContainer">
                      <Rain svgColors={svgColors} />
                      <Percent svgColors={svgColors} />
                    </div>
                  </Tooltip>
                  {day.pop}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <Temperature svgColors={svgColors} />
                  <div className="tempContainer">
                    {day.temp.morn ? (
                      <div>Morning {day.temp.morn}</div>
                    ) : null}
                    {day.temp.day ? (
                      <div className="tempHolder">
                        {day.feels_like.day ? (
                          <>
                            <div>Day {day.temp.day}</div>
                            <div className="tempSvgContainer">
                              <FeelsLike svgColors={svgColors} />
                              {day.feels_like.day}
                            </div>
                          </>
                        ) : (
                          <div>Day {day.temp.day}</div>
                        )}
                      </div>
                    ) : null}
                    {day.temp.eve ? (
                      <div>Evening: {day.temp.eve}</div>
                    ) : null}
                    {day.temp.night ? (
                      <div className="tempHolder">
                        {day.feels_like.night ? (
                          <>
                            <div>Night: {day.temp.night}</div>
                            <div className="tempSvgContainer">
                              <FeelsLike svgColors={svgColors} />{' '}
                              {day.feels_like.night}
                            </div>
                          </>
                        ) : (
                          <div>Night: {day.temp.night}</div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <Humidity svgColors={svgColors} /> {day.humidity}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <UVI svgColors={svgColors} /> {day.uvi}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>
                <div className="dailyDataDiv">
                  <Windy svgColors={svgColors} />
                  <div className="moonTimings">
                    <div>Wind deg {day.wind_deg}</div>
                    <div>Wind gust {day.wind_gust}</div>
                    <div>Wind speed {day.wind_speed}</div>
                  </div>
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>
                <div className="dailyDataDiv">
                  <Clouds svgColors={svgColors} /> {day.clouds}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <DewPoint svgColors={svgColors} /> {day.dew_point}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <Pressure svgColors={svgColors} />
                  {day.pressure}
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  <Sunny />
                  <div className="moonTimings">
                    <div>Sunrise {day.sunrise}</div>
                    <div>Sunset {day.sunset}</div>
                  </div>
                </div>
                <div
                  className="separator"
                  style={{ border: `1px solid ${separatorColor}` }}
                ></div>

                <div className="dailyDataDiv">
                  {getMoonPhase(day.moon_phase as number, svgColors)}
                  <div className="moonTimings">
                    <div>Moonrise {day.moonrise}</div>
                    <div>Moonset {day.moonset}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={() => getNextDays()}>
          <Next svgColors={svgColors} />
        </button>
      </div>
    </motion.div>
  );
};

export default DailyData;
