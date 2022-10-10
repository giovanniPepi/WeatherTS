import Tooltip from '@material-ui/core/Tooltip';
import { LazyMotion, m } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const FullMoon: React.FC<ISvgColors> = ({ svgColors }) => {
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
      <Tooltip title="Moon phase: Waning Creacent" placement="left-start">
        <m.svg
          className="FullMoonSvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          variants={svgVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <m.path
            d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z"
            variants={pathVariants}
          />
        </m.svg>
      </Tooltip>
    </LazyMotion>
  );
};

export default FullMoon;
