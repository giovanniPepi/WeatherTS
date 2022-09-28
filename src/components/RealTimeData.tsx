import { RealTimeDataProps } from 'interfaces';
import React, { useState } from 'react';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import Alert from 'src/icons/Alerts';
import ExtendedCurrentWeather from './ExtendedCurrentWeather';
import { motion } from 'framer-motion';
import getWindDir from 'src/functions/getWindDir';
import convertToKm from 'src/functions/convertToKm';

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow
}) => {
  //state
  const [showExtendedCurrentWeather, setShowExtendedCurrentWeather] =
    useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

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
      {apiData.alerts && !showAlerts ? (
        <button onClick={() => setShowAlerts(true)}>
          <Alert />

          {apiData.alerts[0].sender_name}
        </button>
      ) : null}

      {showAlerts ? (
        <>
          {/* Colocar SVGS de acordo com tag? */}
          <div>{apiData.alerts[0].description}</div>
          <button onClick={() => setShowAlerts(false)}>
            Hide Alerts
          </button>
        </>
      ) : null}

      <button onClick={() => setShowExtendedCurrentWeather(true)}>
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
