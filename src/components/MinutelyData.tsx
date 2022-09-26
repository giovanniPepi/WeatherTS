import { v4 } from "uuid";
import { MinutelyProps } from "interfaces";
import getExactHours from "src/functions/getExactHour";

const MinutelyData: React.FC<MinutelyProps> = ({ minuteData }) => {
  // console.log("MinutelyData component called: ", minuteData);

  return (
    <section className="minutelyDataOverlay">
      <div className="minutelyDataModal">
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
