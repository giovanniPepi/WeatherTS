import { ICurrentWeatherArray } from 'interfaces';
import clearDayBg from '../img/day/clearDayBg.png';
import clearNightBg from '../img/night/clearNightBg.png';
import cloudsDayBg from '../img/day/cloudsDayBg.png';
import cloudsNightBg from '../img/night/cloudsNightBg.png';
import rainDayBg from '../img/day/rainDayBg.png';
import rainNightBg from '../img/night/rainNightBg.png';
import thunderstormBg from '../img/thunderstormBg.png';
import fogDayBg from '../img/day/fogDayBg.png';
import fogNightBg from '../img/night/fogNightBg.png';
import snowDayBg from '../img/day/snowDayBg.png';
import snowNightBg from '../img/night/snowNightBg.png';

const getWeatherBackground = (
  weatherArray: ICurrentWeatherArray | undefined,
  night: boolean
) => {
  // console.log('weather', weatherArray?.main, 'night:', night);

  if (!night) {
    switch (weatherArray?.main) {
      case 'Clouds':
        return cloudsDayBg;
      case 'Rain':
      case 'Drizzle':
        return rainDayBg;
      case 'Thunderstorm':
        return thunderstormBg;
      case 'Fog':
      case 'Haze':
        return fogDayBg;
      case 'Snow':
        return snowDayBg;
      case 'Clear':
        return clearDayBg;
      default:
        return clearDayBg;
    }
  } else if (night) {
    switch (weatherArray?.main) {
      case 'Clouds':
        return cloudsNightBg;
      case 'Rain':
      case 'Drizzle':
        return rainNightBg;
      case 'Thunderstorm':
        return thunderstormBg;
      case 'Fog':
      case 'Haze':
        return fogNightBg;
      case 'Snow':
        return snowNightBg;
      case 'Clear':
        return clearNightBg;
      default:
        return console.log(
          'diff weather, checl getWeatherBackground',
          weatherArray?.main,
          night
        );
    }
  }
};

export default getWeatherBackground;
