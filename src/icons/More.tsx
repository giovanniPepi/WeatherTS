import Tooltip from '@material-ui/core/Tooltip';
import { LazyMotion, m } from 'framer-motion';
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

  const loadFeatures = () =>
    import('../functions/features.js').then((res) => res.default);

  return (
    <LazyMotion features={loadFeatures}>
      <Tooltip title="Expand section" placement="left-start">
        <m.svg
          className="MoreSvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          variants={svgVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <m.path
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            variants={pathVariants}
          />
        </m.svg>
      </Tooltip>
    </LazyMotion>
  );
};

export default More;
