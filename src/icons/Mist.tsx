import { motion } from 'framer-motion';
import { NightProps } from 'interfaces';

const Mist: React.FC<NightProps> = ({ night }) => {
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
      className="mistSvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.path
        d="M3,15H13C13.55,15 14,15.45 14,16C14,16.55 13.55,17 13,17H3C2.45,17 2,16.55 2,16C2,15.45 2.45,15 3,15M16,15H21C21.55,15 22,15.45 22,16C22,16.55 21.55,17 21,17H16C15.45,17 15,16.55 15,16C15,15.45 15.45,15 16,15M1,12C1,9.24 3.24,7 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21C21,11.9 20.1,11 19,11H17V10C17,7.24 14.76,5 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9C4.34,9 3,10.34 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5C5.55,19 6,19.45 6,20C6,20.55 5.55,21 5,21H3C2.45,21 2,20.55 2,20C2,19.45 2.45,19 3,19M8,19H21C21.55,19 22,19.45 22,20C22,20.55 21.55,21 21,21H8C7.45,21 7,20.55 7,20C7,19.45 7.45,19 8,19Z"
        style={{ fill: 'black' }}
        variants={pathVariants}
      />
    </motion.svg>
  );
};

export default Mist;
