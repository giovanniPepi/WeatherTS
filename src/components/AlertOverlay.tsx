import { AlertsModalProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import getMoonPhase from 'src/functions/getMoonPhase';

const AlertsModal: React.FC<AlertsModalProps> = ({
  apiData,
  setShowAlertsModal
}) => {
  const domNode = useClickOutside(() => {
    setShowAlertsModal(false);
  });

  return (
    <motion.div
      className="alertsMotionDiv"
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
      <div className="alertsOverlay">
        <div className="alertsModal" ref={domNode}>
          <div>{apiData.alerts[0].description}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertsModal;
