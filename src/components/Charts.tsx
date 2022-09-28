import { MinutelyChartProps } from 'interfaces';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(...registerables);

const Charts: React.FC<MinutelyChartProps> = ({ minuteData }) => {
  // console.log('received', minuteData);

  // store info in arrays
  const N = 60;
  const xAxis = Array.from({ length: N }, (_, index) => index + 1);

  const pptArray: number[] = [];

  minuteData.forEach((obj) => {
    let values = Object.values(obj);
    // slices out 'mm'
    values = values[1].slice(0, -2);

    // multiply to get percentage, fix decimals, convert to float
    // instead of string
    const formatted = parseFloat(
      ((values as unknown as number) * 100).toFixed(1)
    );
    pptArray.push(formatted);
  });

  return (
    <Line
      height={400}
      width={600}
      data={{
        labels: xAxis,
        datasets: [
          {
            label: 'Probability of rain, %',
            data: pptArray,
            backgroundColor: ['blue']
          }
        ]
      }}
      options={{
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: {
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }}
    />
  );
};

export default Charts;
