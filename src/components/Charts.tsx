import { MinutelyChartProps } from 'interfaces';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const Charts: React.FC<MinutelyChartProps> = ({ minuteData }) => {
  const timeArray: string[] = [];
  const pptArray: number[] = [];

  minuteData.forEach((obj) => {
    let values = Object.values(obj);

    const time = values[0];
    timeArray.push(time);

    // slices out 'mm'
    values = values[1].slice(0, -2);

    // multiply to get percentage, fix decimals, convert to float
    // instead of string
    const formatted = parseFloat(values as unknown as string);

    pptArray.push(formatted);
  });

  return (
    <Bar
      height={400}
      width={600}
      data={{
        labels: timeArray,
        datasets: [
          {
            label: 'Rain volume, mm ',
            data: pptArray,
            backgroundColor: ['#075985'],
            borderColor: ['#a54608'],
            borderWidth: 0.8,
            borderRadius: 2
          }
        ]
      }}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
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
