import { AlertsModalProps } from 'interfaces';
import useClickOutside from 'src/functions/useClickOutside';
import { LazyMotion, m } from 'framer-motion';

const AlertsModal: React.FC<AlertsModalProps> = ({
  apiData,
  setShowAlertsModal,
  UIColor
}) => {
  const domNode = useClickOutside(() => {
    setShowAlertsModal(false);
  });

  const loadFeatures = () =>
    import('../functions/features.js').then((res) => res.default);

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
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
        <div
          className="alertsModal"
          ref={domNode}
          style={{ color: UIColor }}
        >
          {apiData.alerts![0].description}
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default AlertsModal;
