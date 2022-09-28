import { RealTimeDataProps } from 'interfaces';
import React, { useState } from 'react';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import Alert from 'src/icons/Alerts';
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

  return (
    <section className="realTimeData">
      <div>
        {locationToShow} - {apiData.current.dt}
      </div>
      <div>
        {getWeatherIcon(apiData.current.weather[0].main)}
        {apiData.current.weather[0].description}
      </div>
      <div>Temp: {apiData.current.temp}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>UV: {apiData.current.uvi}</div>
      <div>{apiData.current.wind_deg as number}</div>
      <div>{apiData.current.wind_speed as number}</div>

      {/* alerts */}

      {apiData.alerts && showAlertsModal ? (
        <AlertsModal
          apiData={apiData}
          setShowAlertsModal={setShowAlertsModal}
        />
      ) : (
        <button
          className="alertBtnHome"
          onClick={() => setShowAlertsModal(true)}
        >
          <Alert /> {apiData.alerts[0].sender_name}
        </button>
      )}

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
