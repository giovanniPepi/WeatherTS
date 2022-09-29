import { motion } from 'framer-motion';

const FullMoon = () => {
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
      transition: {
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.svg
      className="FullMoonSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z"
        variants={pathVariants}
      />
    </motion.svg>
  );
};

export default FullMoon;