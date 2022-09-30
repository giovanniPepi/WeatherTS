import { ExtendedRealTimeDataProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import { useState } from 'react';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import getMoonPhase from 'src/functions/getMoonPhase';
import Temperature from 'src/icons/Temperature';
import FeelsLike from 'src/icons/FeelsLike';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import Clouds from 'src/icons/Clouds';
import Windy from 'src/icons/Windy';
import isNight from 'src/functions/isNight';
import DewPoint from 'src/icons/DewPoint';
import Pressure from 'src/icons/Pressure';
import Visibility from 'src/icons/Visibility';
import Rain from 'src/icons/Rain';
import Snow from 'src/icons/Snow';
import Sunny from 'src/icons/Sunny';
import Sunrise from 'src/icons/Sunrise';

const ExtendedCurrentWeather: React.FC<ExtendedRealTimeDataProps> = ({
  apiData,
  setShowExtendedCurrentWeather,
  locationToShow
}) => {
  //state
  const [showAlerts, setShowAlerts] = useState<Boolean>(false);

  //clicks
  const domNode = useClickOutside(() => {
    setShowExtendedCurrentWeather(false);
  });

  const night = isNight();

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
      <div className="extendedOverlay">
        <div className="extendedModal" ref={domNode}>
          <div className="dailyDt">
            <div>
              {locationToShow} - {apiData.current.dt}
            </div>
          </div>
          <div className="separator"></div>
          <div className="realTimeDataDiv">
            {/*gets the weather icon through getMoonphase to return the correct phase if it's night */}
            {apiData.current.weather[0].main === 'Clear' && night ? (
              <>
                {getMoonPhase(apiData.daily[0].moon_phase as number)}
              </>
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

          {/* conditional rendering for rain and snow */}
          {apiData.current.rain ? (
            <>
              <div className="realTimeDataDiv">
                <Rain night={night} />
                <div className="moonTImings">
                  <div>{apiData.current.rain['1h']}</div>
                  <div>{apiData.current.rain['3h']}</div>
                </div>
              </div>
              <div className="separator"></div>
            </>
          ) : null}
          {apiData.current.snow ? (
            <>
              <div className="realTimeDataDiv">
                <Snow night={night} />
                <div className="moonTImings">
                  <div>{apiData.current.snow['1h']}</div>
                  <div>{apiData.current.snow['3h']}</div>
                </div>
              </div>
              <div className="separator"></div>
            </>
          ) : null}

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

          {showAlerts ? (
            <>
              <div>{apiData.alerts[0].description}</div>
              <button
                className="showAlertsBtn"
                onClick={() => setShowAlerts(false)}
              >
                Hide Alerts
              </button>
              <div className="separator"></div>
            </>
          ) : apiData.alerts ? (
            <>
              <div className="showAlertsDiv">
                <button
                  className="showAlertsBtn"
                  onClick={() => setShowAlerts(true)}
                >
                  Show Alerts
                </button>
              </div>
              <div className="separator"></div>
            </>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ExtendedCurrentWeather;
