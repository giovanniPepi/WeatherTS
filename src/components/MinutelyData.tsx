import { v4 } from "uuid";
import { MinutelyProps } from "interfaces";
import getExactHours from "src/functions/getExactHour";

const MinutelyData: React.FC<MinutelyProps> = ({ minuteData }) => {
  // console.log("MinutelyData component called: ", minuteData);

  return (
    <div>
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
  );
};

export default MinutelyData;
