import { LazyMotion, m } from 'framer-motion';
import { ISvgColors } from 'interfaces';

const Previous: React.FC<ISvgColors> = ({ svgColors }) => {
  const svgVariants = {
    hidden: { rotate: -180 },
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

  const loadFeatures = () =>
    import('../functions/features.js').then((res) => res.default);

  return (
    <LazyMotion features={loadFeatures}>
      <m.svg
        className="PreviousSvg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <m.path
          d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          variants={pathVariants}
        />
      </m.svg>
    </LazyMotion>
  );
};

export default Previous;
