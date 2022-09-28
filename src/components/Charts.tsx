import { MinutelyChartProps } from 'interfaces';
import { Line } from 'react-chartjs-2';

const Charts: React.FC<MinutelyChartProps> = ({ minuteData }) => {
  // console.log(minuteData);

  // store info in arrays
  const labelsArray: string[] = [];
  const pptArray: string[] = [];

  minuteData.forEach((obj) => {
    //console.log('obj', obj);
    const values = Object.values(obj);
    labelsArray.push(values[0]);
    pptArray.push(values[1]);
  });

  console.log('labels', labelsArray, 'ppt', pptArray);

  // return <Line />;
};

export default Charts;
