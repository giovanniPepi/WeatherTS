import { AlertsModalProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { motion } from 'framer-motion';

const AlertsModal: React.FC<AlertsModalProps> = ({
  apiData,
  setShowAlertsModal
}) => {
  const domNode = useClickOutside(() => {
    setShowAlertsModal(false);
  });

  return (
    <motion.div
      className="alertsOverlay"
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
      <div className="alertsModal" ref={domNode}>
        {apiData.alerts[0].description}
      </div>
    </motion.div>
  );
};

export default AlertsModal;
