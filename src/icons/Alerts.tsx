import { motion } from 'framer-motion';

const Alert = () => {
  //svg animation
  // https://www.youtube.com/watch?v=ILxNdOtKbNQ
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
      className="alertSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ width: '1.5rem', height: '1.5rem' }}
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"
        style={{ fill: 'rgb(253, 224, 71)' }}
        variants={pathVariants}
      />
    </motion.svg>
  );
};

export default Alert;
