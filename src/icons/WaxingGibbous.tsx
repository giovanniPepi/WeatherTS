import { motion } from 'framer-motion';

const WaxingGibousMoon = () => {
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
      className="WaxingGibousMoonSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M6 12C6 7.5 7.93 3.26 12 2A10 10 0 0 1 12 22C7.93 20.74 6 16.5 6 12Z"
        variants={pathVariants}
      />
    </motion.svg>
  );
};

export default WaxingGibousMoon;