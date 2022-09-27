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
      <div>Updated at: {apiData.current.dt}</div>
      <div>{locationToShow}</div>
      <div>{apiData.current.weather[0].description}</div>
      <div>Temp: {apiData.current.temp}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>UV: {apiData.current.uvi}</div>

      </div>
    </div>

    </motion.div>
  )
};

export default ExtendedCurrentWeather;
