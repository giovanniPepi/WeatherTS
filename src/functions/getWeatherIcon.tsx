import Clouds from 'src/icons/Clouds';
import Mist from 'src/icons/Mist';
import MoonClear from 'src/icons/MoonClear';
import Rain from 'src/icons/Rain';
import Snow from 'src/icons/Snow';
import Sunny from 'src/icons/Sunny';
import Thunderstorm from 'src/icons/Thunderstorm';
import Tooltip from '@material-ui/core/Tooltip';

import isNight from './isNight';

const getWeatherIcon = (weatherDesc: string, applyTheme: boolean) => {
  // console.log(weatherDesc, applyTheme);
  let night;

  if (applyTheme) night = isNight();
  else night = false;

  if (night && weatherDesc === 'Clear')
    return (
      <Tooltip title="Clear sky" placement="left-start">
        <div>
          <MoonClear />
        </div>
      </Tooltip>
    );

  switch (weatherDesc) {
    case 'Clear':
      return (
        <Tooltip title="Clear sky" placement="left-start">
          <div>
            <Sunny />
          </div>
        </Tooltip>
      );
    case 'Clouds':
      return (
        <Tooltip title="Clouds" placement="left-start">
          <div>
            <Clouds night={night} />
          </div>
        </Tooltip>
      );
    case 'Rain':
    case 'Drizzle':
      return (
        <Tooltip title="Rain" placement="left-start">
          <div>
            <Rain night={night} />
          </div>
        </Tooltip>
      );
    case 'Thunderstorm':
      return (
        <Tooltip title="Thunderstorm" placement="left-start">
          <div>
            <Thunderstorm night={night} />
          </div>
        </Tooltip>
      );
    case 'Snow':
      return (
        <Tooltip title="Snow" placement="left-start">
          <div>
            <Snow night={night} />
          </div>
        </Tooltip>
      );
    case 'Mist':
      return (
        <Tooltip title="Mist" placement="left-start">
          <div>
            <Mist night={night} />
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
