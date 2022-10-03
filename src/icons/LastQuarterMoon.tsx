import { Tooltip } from '@material-ui/core';
import { motion } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const LastQuarterMoon: React.FC<ISvgColors> = ({ svgColors }) => {
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
    <Tooltip title="Moon phase: Last Quarter" placement="left-start">
      <motion.svg
        className="LastQuarterMoonSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.path
          d="M12 2A10 10 0 0 0 12 22Z"
          variants={pathVariants}
        />
      </motion.svg>
    </Tooltip>
  );
};

export default LastQuarterMoon;
