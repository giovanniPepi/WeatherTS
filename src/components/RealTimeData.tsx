import { RealTimeDataProps } from 'interfaces';
import React, { useEffect, useState } from 'react';
import Alert from 'src/icons/Alerts';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import getMoonPhase from 'src/functions/getMoonPhase';
import Temperature from 'src/icons/Temperature';
import FeelsLike from 'src/icons/FeelsLike';
import Humidity from 'src/icons/Humidity';
import Clouds from 'src/icons/Clouds';
import Windy from 'src/icons/Windy';
import isNight from 'src/functions/isNight';
import DewPoint from 'src/icons/DewPoint';
import Pressure from 'src/icons/Pressure';
import Visibility from 'src/icons/Visibility';
import Rain from 'src/icons/Rain';
import Snow from 'src/icons/Snow';
import Sunny from 'src/icons/Sunny';
import UVI from 'src/icons/UVI';
import AlertsModal from './AlertOverlay';
import TickingOneSecond from 'src/functions/TickingOneSecond';
import TitleAnimation from 'src/functions/TitleAnimation';
import getHour from 'src/functions/getHour';
import getMinute from 'src/functions/getMinute';

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow,
  loading
}) => {
  //state
  const [showAlertsModal, setShowAlertsModal] =
    useState<Boolean>(false);
  const [night, setNight] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [hour, sethour] = useState<number>(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      const currentMinute = getMinute();
      const currentHour = getHour();
      const currentNight = isNight();

      setNight(currentNight);
      sethour(currentHour as number);
      setMinutes(currentMinute as number);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <motion.div
      className="realTimeData"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1
      }}
      transition={{ duration: 2 }}
      exit={{
        opacity: 0,
        x: window.innerWidth
      }}
    >
      <div className="dailyDt strong">
        <div>
          {loading ? null : <TitleAnimation title={locationToShow} />}
        </div>
        <div className="tickingTime">
          {hour}
          <TickingOneSecond />
          {minutes}
        </div>
      </div>
      <div className="separator"></div>
      <div className="realTimeDataDiv">
        {/*gets the weather icon through getMoonphase to return the correct phase if it's night */}
        {apiData.current.weather[0].main === 'Clear' && night ? (
          <>{getMoonPhase(apiData.daily[0].moon_phase as number)}</>
        ) : (
          getWeatherIcon(apiData.current.weather[0].main, true)
        )}
        {apiData.current.weather[0].description}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <Temperature /> {apiData.current.temp}
      </div>

      <div className="realTimeDataDiv">
        <FeelsLike /> {apiData.current.feels_like}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <Humidity /> {apiData.current.humidity}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <UVI /> {apiData.current.uvi}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <Clouds night={night} />
        {apiData.current.clouds}
      </div>
      <div className="separator"></div>

      {/* conditional rendering for rain and snow */}
      {apiData.current.rain ? (
        <>
          <div className="realTimeDataDiv">
            <Rain night={night} />
            <div className="moonTimings">
              <div>{apiData.current.rain['1h']} - last hour</div>
              <div>
                {apiData.current.rain['3h']
                  ? `${apiData.current.rain['3h']} - last 3 hours`
                  : null}
              </div>
            </div>
          </div>
          <div className="separator"></div>
        </>
      ) : null}
      {apiData.current.snow ? (
        <>
          <div className="realTimeDataDiv">
            <Snow night={night} />
            <div className="moonTimings">
              <div>{apiData.current.snow['1h']} - last hour</div>
              <div>
                {apiData.current.snow['3h']
                  ? `${apiData.current.snow['3h']} - last 3 hours`
                  : null}
              </div>
            </div>
          </div>
          <div className="separator"></div>
        </>
      ) : null}

      <div className="realTimeDataDiv">
        <Windy />
        <div className="windContainer">
          <div>{apiData.current.wind_deg as number}</div>
          <div>{apiData.current.wind_speed as number}</div>
        </div>
      </div>
      <div className="realTimeDataDiv"></div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <DewPoint />
        {apiData.current.dew_point}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <Pressure />
        {apiData.current.pressure}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <Visibility />
        {apiData.current.visibility}
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        <Sunny />
        <div className="moonTimings">
          <div>{apiData.current.sunrise}</div>
          <div>{apiData.current.sunset}</div>
        </div>
      </div>
      <div className="separator"></div>

      <div className="realTimeDataDiv">
        {getMoonPhase(apiData.daily[0].moon_phase as number)}
        <div className="moonTimings">
          <div>{apiData.daily[0].moonrise}</div>
          <div>{apiData.daily[0].moonset}</div>
        </div>
      </div>
      <div className="separator"></div>

      {apiData.alerts && showAlertsModal ? (
        <AlertsModal
          apiData={apiData}
          setShowAlertsModal={setShowAlertsModal}
        />
      ) : null}
      {apiData.alerts ? (
        <button
          className="alertBtnHome"
          onClick={() => setShowAlertsModal(true)}
        >
          <Alert /> {apiData.alerts[0]?.sender_name}
        </button>
      ) : null}
    </motion.div>
  );
};

export default RealTimeData;
