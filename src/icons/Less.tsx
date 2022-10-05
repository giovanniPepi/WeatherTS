import { Tooltip } from '@material-ui/core';
import { motion } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const Less: React.FC<ISvgColors> = ({ svgColors }) => {
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
    <Tooltip title="Collapse section" placement="left-start">
      <motion.svg
        className="LessSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.path
          d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
          variants={pathVariants}
        />
      </motion.svg>
    </Tooltip>
  );
};

export default Less;
