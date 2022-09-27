import { ExtendedRealTimeDataProps } from "interfaces";
import useClickOutside from "src/functions/useClickOutside";
import { motion } from "framer-motion";


const ExtendedCurrentWeather: React.FC<ExtendedRealTimeDataProps> = ({
  apiData,
  setShowExtendedCurrentWeather,
  locationToShow,
}) => {
  const domNode = useClickOutside(() => {
    setShowExtendedCurrentWeather(false);
  });

  return (
    <motion.div
      className="hourly"
      /* style={{ backgroundImage: `url(${backgroundImg}) ` }} */
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
      }}
    >
    
    <div className="extendedOverlay">
      <div className="extendedModal" ref={domNode}>
      <div>{locationToShow} - {apiData.current.dt}</div>
      <div>{apiData.current.weather[0].description}</div>
      <div>Temp: {apiData.current.temp}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>UV: {apiData.current.uvi}</div>
      <div>{apiData.current.clouds}</div>
      <div>{apiData.current.dew_point}</div>
      <div>{apiData.current.pressure}</div>
      <div>{apiData.current.visibility}</div>


      {/* conditional rendering for rain and snow */}
      {apiData.current.rain? <><div>{apiData.current.rain["1h"]}{apiData.current.rain["3h"]}</div></>: null}
      {apiData.current.snow? <><div>{apiData.current.snow["1h"]}{apiData.current.snow["3h"]}</div></>: null}

      <div>{apiData.current.sunrise}</div>
      <div>{apiData.current.sunset}</div>


      </div>
    </div>

    </motion.div>
  )
};

export default ExtendedCurrentWeather;
