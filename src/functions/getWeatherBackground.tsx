import { ICurrentWeatherArray } from 'interfaces';
import clearDayBg from '../img/day/clearDayBg.webp';
import clearNightBg from '../img/night/clearNightBg.webp';
import cloudsDayBg from '../img/day/cloudsDayBg.webp';
import cloudsNightBg from '../img/night/cloudsNightBg.webp';
import rainDayBg from '../img/day/rainDayBg.webp';
import rainNightBg from '../img/night/rainNightBg.webp';
import thunderstormBg from '../img/thunderstormBg.webp';
import fogDayBg from '../img/day/fogDayBg.webp';
import fogNightBg from '../img/night/fogNightBg.webp';
import snowDayBg from '../img/day/snowDayBg.webp';
import snowNightBg from '../img/night/snowNightBg.webp';

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
      case 'Mist':
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
      case 'Mist':
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
