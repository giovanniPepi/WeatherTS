import { RealTimeDataProps } from 'interfaces';
import React, { useState } from 'react';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import Alert from 'src/icons/Alerts';
import ExtendedCurrentWeather from './ExtendedCurrentWeather';
import { motion } from 'framer-motion';

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

  //svg animation
  // https://www.youtube.com/watch?v=ILxNdOtKbNQ
  const svgVariants = {
    hidden: { rotate: -90 },
    visible: {
      rotate: 0,
      transition: { duration: 1 }
    }
  };
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className="realTimeData">
      <div>Updated at: {apiData.current.dt}</div>
      <div>{locationToShow}</div>
      <div>
        {getWeatherIcon(apiData.current.weather[0].main)}
        {apiData.current.weather[0].description}
      </div>
      <div>Temp: {apiData.current.temp}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>UV: {apiData.current.uvi}</div>

      {/* alerts */}
      {apiData.alerts && !showAlerts ? (
        <button onClick={() => setShowAlerts(true)}>
          <motion.svg
            className="alertSvg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width: '1.5rem', height: '1.5rem' }}
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"
              style={{ fill: 'rgb(253, 224, 71)' }}
              variants={pathVariants}
            />
          </motion.svg>

          {apiData.alerts[0].sender_name}
        </button>
      ) : null}

      {showAlerts ? (
        <>
          {' '}
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
