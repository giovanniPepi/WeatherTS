import { v4 } from "uuid";
import { MinutelyProps } from "interfaces";
import getExactHours from "src/functions/getExactHour";
import useClickOutside from "src/functions/useClickOutside";
import { motion } from "framer-motion";

const MinutelyData: React.FC<MinutelyProps> = ({
  minuteData,
  setShowMinutelyModal,
}) => {
  // console.log("MinutelyData component called: ", minuteData);

  const domNode = useClickOutside(() => {
    setShowMinutelyModal(false);
  });

  return (
    <motion.div
      className="minutely"
      /* style={{ backgroundImage: `url(${backgroundImg}) ` }} */
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
      }}
    >
      <section className="minutelyDataOverlay">
        <div className="minutelyDataModal" ref={domNode}>
          Minutely:
          <ul>
            {minuteData.map((minute) => {
              return (
                <li key={v4()}>
                  {getExactHours(minute.dt)}:{minute.precipitation}%
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </motion.div>
  );
};

export default MinutelyData;
