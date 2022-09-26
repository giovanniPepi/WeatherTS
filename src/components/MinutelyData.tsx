import { v4 } from "uuid";
import { MinutelyProps } from "interfaces";
import getExactHours from "src/functions/getExactHour";
import useClickOutside from "src/functions/useClickOutside";

const MinutelyData: React.FC<MinutelyProps> = ({
  minuteData,
  setShowMinutelyModal,
}) => {
  // console.log("MinutelyData component called: ", minuteData);

  const domNode = useClickOutside(() => {
    setShowMinutelyModal(false);
  });

  return (
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
  );
};

export default MinutelyData;
