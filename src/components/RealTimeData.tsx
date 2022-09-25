import { apiDataProps } from "interfaces";

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<apiDataProps> = ({ apiData }): JSX.Element => {
  console.log("data from api: ", apiData);

  return <p>Lon: {apiData.lon}</p>;
};

export default RealTimeData;
