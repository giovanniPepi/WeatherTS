import { LazyMotion, m } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const Pressure: React.FC<ISvgColors> = ({ svgColors }) => {
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
      fill: svgColors,
      transition: {
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  const loadFeatures = () =>
    import('../functions/features.js').then((res) => res.default);

  return (
    <LazyMotion features={loadFeatures}>
      <m.svg
        className="PressureSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <m.path
          d="M13.014,11.002c-1.107,0.008-2.008-0.884-2.016-1.987c-0.009-1.107,0.879-2.007,1.987-2.016   c0.166-0.001,0.324,0.023,0.478,0.06c1.156-0.905,2.667-2.085,2.839-2.208c0.298-0.211,0.64-0.236,0.883,0.007   c0.24,0.248,0.215,0.623-0.01,0.886c-0.077,0.091-1.295,1.622-2.229,2.798c0.034,0.143,0.056,0.291,0.057,0.444   C15.012,10.088,14.122,10.994,13.014,11.002z M0,21c0-0.553,0.448-1,1-1h9v-2.525C6.51,16.236,4,12.91,4,9c0-4.962,4.038-9,9-9   c4.963,0,9,4.038,9,9c0,3.91-2.51,7.236-6,8.475V20h9c0.553,0,1,0.447,1,1s-0.447,1-1,1H1C0.448,22,0,21.553,0,21z M13,15   c3.309,0,6-2.691,6-6s-2.691-6-6-6S7,5.691,7,9S9.691,15,13,15z M25,24H1c-0.552,0-1,0.447-1,1s0.448,1,1,1h24c0.553,0,1-0.447,1-1   S25.553,24,25,24z"
          variants={pathVariants}
        />
      </m.svg>
    </LazyMotion>
  );
};

export default Pressure;
