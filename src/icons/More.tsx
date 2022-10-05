import { Tooltip } from '@material-ui/core';
import { motion } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const More: React.FC<ISvgColors> = ({ svgColors }) => {
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
    <Tooltip title="Moon phase: Full" placement="left-start">
      <motion.svg
        className="MoreSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.path
          d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          variants={pathVariants}
        />
      </motion.svg>
    </Tooltip>
  );
};

export default More;
