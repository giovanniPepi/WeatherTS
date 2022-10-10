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
import clearDayBgPot from '../img/day/potato/clearDayBgPotato.webp';
import cloudsDayBgPot from '../img/day/potato/cloudsDayBgPotato.webp';
import rainDayBgPot from '../img/day/potato/rainDayBgPotato.webp';
import fogDayBgPot from '../img/day/potato/fogDayBgPotato.webp';
import snowDayBgPot from '../img/day/potato/snowDayBgPotato.webp';
import clearNightBgPot from '../img/night/potato/clearNightBgPot.webp';
import cloudsNightBgPot from '../img/night/potato/cloudsNightBgPot.webp';
import rainNightBgPot from '../img/night/potato/rainNightBgPot.webp';
import snowNightBgPot from '../img/night/potato/snowNightBgPot.webp';
import fogNightBgPot from '../img/night/potato/fogNightBgPot.webp';
import thunderstormBgPot from '../img/thunderstormBgPot.webp';

const getWeatherBackground = (
  weatherArray: ICurrentWeatherArray | undefined,
  night: boolean,
  screenWidth: number
) => {
  if (screenWidth > 500) {
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
  } else if (screenWidth <= 500) {
    if (!night) {
      switch (weatherArray?.main) {
        case 'Clouds':
          return cloudsDayBgPot;
        case 'Rain':
        case 'Drizzle':
          return rainDayBgPot;
        case 'Thunderstorm':
          return thunderstormBgPot;
        case 'Fog':
        case 'Haze':
        case 'Mist':
          return fogDayBgPot;
        case 'Snow':
          return snowDayBgPot;
        case 'Clear':
          return clearDayBgPot;
        default:
          return clearDayBgPot;
      }
    } else if (night) {
      switch (weatherArray?.main) {
        case 'Clouds':
          return cloudsNightBgPot;
        case 'Rain':
        case 'Drizzle':
          return rainNightBgPot;
        case 'Thunderstorm':
          return thunderstormBgPot;
        case 'Fog':
        case 'Haze':
        case 'Mist':
          return fogNightBgPot;
        case 'Snow':
          return snowNightBgPot;
        case 'Clear':
          return clearNightBgPot;
        default:
          return console.log(
            'diff weather, checl getWeatherBackground',
            weatherArray?.main,
            night
          );
      }
    }
  }
};

export default getWeatherBackground;
