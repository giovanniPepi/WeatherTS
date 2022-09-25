import { MinutelyProps } from "interfaces";

const MinutelyData: React.FC<MinutelyProps> = ({ minuteData }) => {
  console.log("MinutelyData component called: ", minuteData);

  return (
    <div>
      Minutely:
      <ul>
        {minuteData.map((minute) => {
          return (
            <li>
              {minute.dt}:{minute.precipitation}%
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MinutelyData;
