import { MinutelyProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import Charts from './Charts';

const MinutelyData: React.FC<MinutelyProps> = ({
  minuteData,
  setShowMinutelyModal,
  night,
  UIColor,
  modalUIColor
}) => {
  const domNode = useClickOutside(() => {
    setShowMinutelyModal(false);
  });

  return (
    <section className="minutelyDataOverlay">
      <motion.div
        className="minutely"
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
        <div
          className="minutelyDataModal"
          ref={domNode}
          style={{ color: UIColor, backgroundColor: modalUIColor }}
        >
          <Charts minuteData={minuteData} />
        </div>
      </motion.div>
    </section>
  );
};

export default MinutelyData;
