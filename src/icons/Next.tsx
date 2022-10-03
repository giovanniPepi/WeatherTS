import { motion } from 'framer-motion';

const Next = () => {
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
      className="NextSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.path
        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
        variants={pathVariants}
      />
    </motion.svg>
  );
};

export default Next;
