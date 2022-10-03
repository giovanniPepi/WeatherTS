import { MinutelyChartProps } from 'interfaces';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import CheckAll from 'src/icons/CheckAll';
ChartJS.register(...registerables);

const Charts: React.FC<MinutelyChartProps> = ({
  minuteData,
  UIColor
}) => {
  //state
  const [hasRainValue, setHasRainValue] = useState(false);

  const timeArray: string[] = [];
  const pptArray: number[] = [];

  // changes Color UI
  ChartJS.defaults.color = UIColor;

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

  useEffect(() => {
    // checks if there is any rain value
    const condition: undefined | number = pptArray.find(
      (e) => e !== 0
    );
    if (condition) setHasRainValue(true);
    else setHasRainValue(false);
  }, [hasRainValue, pptArray]);

  return (
    <>
      {hasRainValue ? (
        <Bar
          height={400}
          width={600}
          data={{
            labels: timeArray,
            datasets: [
              {
                label: 'Rain volume, mm ',

                data: pptArray,

                backgroundColor: ['#6d28d9'],
                borderColor: ['#a78bfa'],
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
      ) : (
        <div className="noRain">
          <CheckAll />
          <div className="strong">
            Currently there is no rain forecast for the next 60
            minutes
          </div>
        </div>
      )}
    </>
  );
};

export default Charts;
