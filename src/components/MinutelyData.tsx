import { MinutelyProps } from 'interfaces';
import { motion } from 'framer-motion';
import Charts from './Charts';

const MinutelyData: React.FC<MinutelyProps> = ({
  minuteData,
  setShowMinutelyModal
}) => {
  return (
    <motion.div
      className="minutelyDataModal"
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
      <div>
        <Charts minuteData={minuteData} />
      </div>
    </motion.div>
  );
};

export default MinutelyData;
