import { v4 } from "uuid";
import { MinutelyProps } from "interfaces";

const MinutelyData: React.FC<MinutelyProps> = ({ minuteData }) => {
  // console.log("MinutelyData component called: ", minuteData);

  return (
    <div>
      Minutely:
      <ul>
        {minuteData.map((minute) => {
          return (
            <li key={v4()}>
              {minute.dt}:{minute.precipitation}%
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MinutelyData;
