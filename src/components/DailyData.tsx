import '../css/DailyData.css';
import { nanoid } from 'nanoid';
import { DailyArray, DailyProps } from 'interfaces';
import { LazyMotion, m } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import { useEffect, useState } from 'react';
import Temperature from 'src/icons/Temperature';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import Previous from 'src/icons/Previous';
import Next from 'src/icons/Next';
import getMoonPhase from 'src/functions/getMoonPhase';
import Sunny from 'src/icons/Sunny';
import Windy from 'src/icons/Windy';
import Rain from 'src/icons/Rain';
import Percent from 'src/icons/Percent';
import NetworkError from 'src/icons/NetworkError';
import Tooltip from '@material-ui/core/Tooltip';
import TitleAnimation from 'src/functions/TitleAnimation';
import Separator from './Separator';

const DailyData: React.FC<DailyProps> = ({
  dailyData,
  svgColors,
  modalUIColor,
  separatorColor,
  daysToRender,
  boxShadow,
  UIColor
}) => {
  //state
  const [index, setIndex] = useState(daysToRender);
  const [renderedItems, setRenderedItems] = useState<DailyArray>(dailyData!);
  const [start, setStart] = useState(0);

  const getNextDays = () => {
    if (start > index || start > index - daysToRender) setStart(0);
    if (index > 8) setIndex(8);
    if (index < 8 || start < daysToRender) {
      setIndex(index + daysToRender);
      setStart(start + daysToRender);
    }
  };

  const getPreviousDays = () => {
    if (start < index - daysToRender) setStart(0);
    if (index < start || index < daysToRender) setIndex(daysToRender);
    if (index > daysToRender || start > 0) {
      setStart(start - daysToRender);
      setIndex(index - daysToRender);
    }
  };

  const loadFeatures = () =>
    import('../functions/features.js').then((res) => res.default);

  useEffect(() => {
    const getItemsToRender = () => {
      const newRender: DailyArray = dailyData!.slice(start, index);
      setRenderedItems(newRender);
    };

    getItemsToRender();
  }, [dailyData, daysToRender, start, index]);

  if (dailyData === undefined) {
    return (
      <LazyMotion features={loadFeatures}>
        <m.div
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
        </m.div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        className="dailyDataModal"
        initial={{ opacity: 0 }}
        style={{ backgroundColor: modalUIColor, boxShadow: boxShadow }}
        animate={{
          opacity: 1
        }}
        transition={{ duration: 0.8 }}
        exit={{
          opacity: 0,
          x: window.innerWidth
        }}
      >
        <div className="dailyMainTitle">
          <button onClick={() => getPreviousDays()}>
            <Previous svgColors={svgColors} />
          </button>
          <div>Daily forecast</div>

          <button onClick={() => getNextDays()}>
            <Next svgColors={svgColors} />
          </button>
        </div>
        <div className="dailyControlDiv">
          <ul className="dailyUl">
            {renderedItems.map((day) => {
              return (
                <li key={nanoid()} className="dailyContainer">
                  <div className="dailyDt">
                    <div className="dailyDtTitle">{day.dt}</div>
                    <div className="mainTempCont">
                      <div className="tempContainer">
                        <div className="rainProb">
                          <Temperature svgColors={svgColors} />
                          {day.temp.min} / {day.temp.max}
                        </div>
                      </div>
                      <div className="rainProb rainPercent">
                        <Tooltip title="Rain probability">
                          <div className="rainPercentContainer">
                            <Rain svgColors={svgColors} />
                            <Percent svgColors={svgColors} />
                          </div>
                        </Tooltip>
                        {day.pop}
                      </div>
                    </div>
                  </div>

                  <div className="dailyDataDiv">
                    {getWeatherIcon(
                      day.weather[0].main,
                      false,
                      day.moon_phase as number,
                      svgColors
                    )}
                    <TitleAnimation
                      title={day.weather[0].description}
                      UIColor={UIColor}
                    />
                  </div>

                  <Separator separatorColor={separatorColor} />

                  <div className="dailyDataDiv">
                    <Temperature svgColors={svgColors} />
                    <div className="tempContainer">
                      {day.temp.morn ? (
                        <div>Morning {day.temp.morn}</div>
                      ) : null}
                      {day.temp.eve ? (
                        <div>Evening {day.temp.eve}</div>
                      ) : null}
                      {day.temp.night ? (
                        <div className="tempHolder">
                          <div>Night {day.temp.night}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <Separator separatorColor={separatorColor} />

                  <div className="dailyDataDiv">
                    <Humidity svgColors={svgColors} /> {day.humidity}
                  </div>

                  <Separator separatorColor={separatorColor} />

                  <div className="dailyDataDiv">
                    <UVI svgColors={svgColors} /> {day.uvi}
                  </div>

                  <Separator separatorColor={separatorColor} />

                  <div className="dailyDataDiv">
                    <Windy svgColors={svgColors} />
                    <div className="moonTimings">
                      <div>Wind deg {day.wind_deg}</div>
                      <div>Wind gust {day.wind_gust}</div>
                      <div>Wind speed {day.wind_speed}</div>
                    </div>
                  </div>

                  <Separator separatorColor={separatorColor} />

                  <div className="dailyDataDiv">
                    <Sunny />
                    <div className="moonTimings">
                      <div>Sunrise {day.sunrise}</div>
                      <div>Sunset {day.sunset}</div>
                    </div>
                  </div>

                  <Separator separatorColor={separatorColor} />

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
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default DailyData;
