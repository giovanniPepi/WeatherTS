import { ExtendedRealTimeDataProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import { useState } from 'react';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import getWindDir from 'src/functions/getWindDir';
import convertToKm from 'src/functions/convertToKm';
import getMoonPhase from 'src/functions/getMoonPhase';
import Temperature from 'src/icons/Temperature';
import FeelsLike from 'src/icons/FeelsLike';
import Humidity from 'src/icons/Humidity';
import UVI from 'src/icons/UVI';
import Clouds from 'src/icons/Clouds';
import Windy from 'src/icons/Windy';

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
          {/*gets the weather icon through getMoonphase to return the correct phase if it's night */}
          {apiData.current.weather[0].main === 'Clear' ? (
            <>
              {getMoonPhase(apiData.daily[0].moon_phase as number)}

              {apiData.current.weather[0].description}
            </>
          ) : (
            getWeatherIcon(apiData.current.weather[0].main, true)
          )}
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
            <Clouds />
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

          <div>{apiData.current.dew_point}</div>
          <div className="separator"></div>

          <div>{apiData.current.pressure}</div>
          <div className="separator"></div>

          <div>{apiData.current.visibility}</div>
          <div className="separator"></div>

          {/* conditional rendering for rain and snow */}
          {apiData.current.rain ? (
            <>
              <div>
                {apiData.current.rain['1h']}
                {apiData.current.rain['3h']}
              </div>
              <div className="separator"></div>
            </>
          ) : null}
          {apiData.current.snow ? (
            <>
              <div>
                {apiData.current.snow['1h']}
                {apiData.current.snow['3h']}
              </div>
              <div className="separator"></div>
            </>
          ) : null}

          <div>{apiData.current.sunrise}</div>
          <div className="separator"></div>

          <div>{apiData.current.sunset}</div>
          <div className="separator"></div>

          <div>{apiData.daily[0].moonrise}</div>
          <div className="separator"></div>

          <div>{apiData.daily[0].moonset}</div>
          <div className="separator"></div>

          {showAlerts ? (
            <>
              <div>{apiData.alerts[0].description}</div>
              <button onClick={() => setShowAlerts(false)}>
                Hide Alerts
              </button>
              <div className="separator"></div>
            </>
          ) : (
            <>
              <button onClick={() => setShowAlerts(true)}>
                Show Alerts
              </button>
              <div className="separator"></div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ExtendedCurrentWeather;
