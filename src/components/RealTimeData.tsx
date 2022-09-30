import { RealTimeDataProps } from 'interfaces';
import React, { useState } from 'react';
import getMoonPhase from 'src/functions/getMoonPhase';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import isNight from 'src/functions/isNight';
import Alert from 'src/icons/Alerts';
import FeelsLike from 'src/icons/FeelsLike';
import Humidity from 'src/icons/Humidity';
import Temperature from 'src/icons/Temperature';
import UVI from 'src/icons/UVI';
import Windy from 'src/icons/Windy';
import AlertsModal from './AlertOverlay';
import ExtendedCurrentWeather from './ExtendedCurrentWeather';

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow
}) => {
  //state
  const [showExtendedCurrentWeather, setShowExtendedCurrentWeather] =
    useState(false);
  const [showAlertsModal, setShowAlertsModal] =
    useState<Boolean>(false);

  const night = isNight();

  return (
    <section className="realTimeData">
      <div>
        {locationToShow} - {apiData.current.dt}
      </div>
      <div>
        {/*gets the weather icon through getMoonphase to return the correct phase if it's night */}
        {apiData.current.weather[0].main === 'Clear' && night ? (
          <>
            {getMoonPhase(apiData.daily[0].moon_phase as number)}

            {apiData.current.weather[0].description}
          </>
        ) : (
          getWeatherIcon(apiData.current.weather[0].main, true)
        )}
      </div>
      <div>
        <Temperature /> {apiData.current.temp}
      </div>
      <div>
        <FeelsLike /> {apiData.current.feels_like}
      </div>
      <div>
        <Humidity /> {apiData.current.humidity}
      </div>
      <div>
        <UVI /> {apiData.current.uvi}
      </div>
      <div className="windContainerHome">
        <Windy />
        <div>{apiData.current.wind_deg as number}</div>
        <div>{apiData.current.wind_speed as number}</div>
      </div>

      {/* alerts */}

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

      <button
        onClick={() => setShowExtendedCurrentWeather(true)}
        className="completInfoBtn"
      >
        Complete info
      </button>

      {showExtendedCurrentWeather ? (
        <ExtendedCurrentWeather
          setShowExtendedCurrentWeather={
            setShowExtendedCurrentWeather
          }
          apiData={apiData}
          locationToShow={locationToShow}
        />
      ) : null}
    </section>
  );
};

export default RealTimeData;
