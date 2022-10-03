import { Tooltip } from '@material-ui/core';
import { motion } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const WaningGibbousMoon: React.FC<ISvgColors> = ({ svgColors }) => {
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

  return (
    <Tooltip
      title="Moon phase: Waning Gibbous"
      placement="left-start"
    >
      <motion.svg
        className="WaningGibbousMoonSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.path
          d="M18 12C18 7.5 16.08 3.26 12 2A10 10 0 0 0 12 22C16.08 20.74 18 16.5 18 12Z"
          variants={pathVariants}
        />
      </motion.svg>
    </Tooltip>
  );
};

export default WaningGibbousMoon;
