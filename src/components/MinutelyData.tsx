import { MinutelyProps } from 'interfaces';
import { motion } from 'framer-motion';
import NetworkError from 'src/icons/NetworkError';
import '../css/Minutely.css';
import React, { Suspense } from 'react';
import Loading from 'src/icons/Loading';

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
        transition={{ duration: 0.8 }}
        exit={{
          opacity: 0,
          x: window.innerWidth
        }}
      >
        <NetworkError svgColors={svgColors} />
        <div>
          Couldn't get API data. Check your connection or try again later.
        </div>
      </motion.div>
    );
  }

  const Charts = React.lazy(() => import('./Charts'));

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
      <Suspense fallback={<Loading svgColors={svgColors} />}>
        <Charts minuteData={minuteData} UIColor={UIColor} />
      </Suspense>
    </motion.div>
  );
};

export default MinutelyData;
