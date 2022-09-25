import { apiDataProps } from "interfaces";

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<apiDataProps> = ({ apiData }) => {
  // console.log("realtime component called: ", apiData);

  return (
    <div>
      {apiData.lat && apiData.lon ? (
        <div>
          Location: {apiData.lon}
          {apiData.lat}
        </div>
      ) : null}
    </div>
  );
};

export default RealTimeData;
