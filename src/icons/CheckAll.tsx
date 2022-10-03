import { motion } from 'framer-motion';

const CheckAll = () => {
  const svgVariants = {
    hidden: { rotate: 180 },
    visible: {
      rotate: 0,
      transition: { duration: 1.5 }
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
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.svg
      className="CheckAllSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.path
        d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z"
        style={{ fill: '#4ade80' }}
        variants={pathVariants}
      />
    </motion.svg>
  );
};

export default CheckAll;
