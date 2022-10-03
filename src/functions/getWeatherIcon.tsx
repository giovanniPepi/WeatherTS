import Clouds from 'src/icons/Clouds';
import Mist from 'src/icons/Mist';
import Rain from 'src/icons/Rain';
import Snow from 'src/icons/Snow';
import Sunny from 'src/icons/Sunny';
import Thunderstorm from 'src/icons/Thunderstorm';
import Tooltip from '@material-ui/core/Tooltip';
import getMoonPhase from './getMoonPhase';

const getWeatherIcon = (
  weatherDesc: string,
  night: boolean,
  moonPhase: number,
  svgColors: string
) => {
  // console.log(weatherDesc, 'night?', night, 'moonphase?', moonPhase);

  if (night === true && weatherDesc === 'Clear')
    return <div>{getMoonPhase(moonPhase)}</div>;

  switch (weatherDesc) {
    case 'Clear':
      return (
        <Tooltip
          title="Main weather: Clear sky"
          placement="left-start"
        >
          <div>
            <Sunny />
          </div>
        </Tooltip>
      );
    case 'Clouds':
      return (
        <Tooltip title="Main weather: Clouds" placement="left-start">
          <div>
            <Clouds svgColors={svgColors} />
          </div>
        </Tooltip>
      );
    case 'Rain':
    case 'Drizzle':
      return (
        <Tooltip title="Main weather: Rain" placement="left-start">
          <div>
            <Rain svgColors={svgColors} />
          </div>
        </Tooltip>
      );
    case 'Thunderstorm':
      return (
        <Tooltip
          title="Main weather: Thunderstorm"
          placement="left-start"
        >
          <div>
            <Thunderstorm svgColors={svgColors} />
          </div>
        </Tooltip>
      );
    case 'Snow':
      return (
        <Tooltip title="Main weather: Snow" placement="left-start">
          <div>
            <Snow svgColors={svgColors} />
          </div>
        </Tooltip>
      );
    case 'Mist':
      return (
        <Tooltip title="Main weather: Mist" placement="left-start">
          <div>
            <Mist svgColors={svgColors} />
          </div>
        </Tooltip>
      );
    default:
      console.log(
        'Error in weather:',
        weatherDesc,
        typeof weatherDesc,
        'check getWeatherIcon'
      );
  }
};

export default getWeatherIcon;
