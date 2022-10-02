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

  if (night && weatherDesc === 'Clear') return <MoonClear />;

  switch (weatherDesc) {
    case 'Clear':
      return (
        <Tooltip title="fuckthisshit" placement="left-start">
          <Sunny />
        </Tooltip>
      );
    case 'Clouds':
      return <Clouds night={night} />;
    case 'Rain':
    case 'Drizzle':
      return <Rain night={night} />;
    case 'Thunderstorm':
      return <Thunderstorm night={night} />;
    case 'Snow':
      return <Snow night={night} />;
    case 'Mist':
      return <Mist night={night} />;
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
