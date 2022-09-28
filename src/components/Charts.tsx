import { MinutelyChartProps } from 'interfaces';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(...registerables);

const Charts: React.FC<MinutelyChartProps> = ({ minuteData }) => {
  // console.log('received', minuteData);

  // store info in arrays
  const N = 60;
  const arr = Array.from({ length: N }, (_, index) => index + 1);
  console.log(arr);

  const pptArray: string[] = [];

  minuteData.forEach((obj) => {
    //console.log('obj', obj);
    const values = Object.values(obj);
    pptArray.push(values[1]);
  });

  // console.log('labels', labelsArray, 'ppt', pptArray);

  return (
    <Line
      data={{
        labels: ['fuck', 'fuck2', 'fuck3'],
        datasets: [
          {
            label: 'fucking label',
            data: pptArray,
            backgroundColor: ['red', 'blue', 'green']
          }
        ]
      }}
      height={400}
      width={600}
    />
  );
};

export default Charts;
