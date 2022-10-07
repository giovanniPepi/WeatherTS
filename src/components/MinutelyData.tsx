import { MinutelyProps } from 'interfaces';
import { motion } from 'framer-motion';
import Charts from './Charts';
import NetworkError from 'src/icons/NetworkError';
import '../css/Minutely.css';

const MinutelyData: React.FC<MinutelyProps> = ({
  minuteData,
  setShowMinutelyModal,
  UIColor,
  modalUIColor,
  svgColors,
  boxShadow
}) => {
  if (minuteData === undefined) {
    return (
      <motion.div
        className="realTimeData"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1
        }}
        style={{
          backgroundColor: modalUIColor,
          boxShadow: boxShadow
        }}
        transition={{ duration: 2 }}
        exit={{
          opacity: 0,
          x: window.innerWidth
        }}
      >
        <NetworkError svgColors={svgColors} />
        <div>
          Couldn't get API data. Check your connection or try again
          later.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="minutelyDataModal"
      style={{ backgroundColor: modalUIColor, boxShadow: boxShadow }}
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
      <Charts minuteData={minuteData} UIColor={UIColor} />
    </motion.div>
  );
};

export default MinutelyData;
