import { ICurrentWeatherArray } from 'interfaces';
import clearDayBg from '../img/clearDayBg.png';
import clearNightBg from '../img/clearNightBg.png';
import cloudsDayBg from '../img/cloudsDayBg.png';
import cloudsNightBg from '../img/cloudsNightBg.png';
import rainDayBg from '../img/rainDayBg.png';
import rainNightBg from '../img/rainNightBg.png';
import thunderstormBg from '../img/thunderstormBg.png';
import fogDayBg from '../img/fogDayBg.png';
import fogNightBg from '../img/fogNightBg.png';
import snowDayBg from '../img/snowDayBg.png';
import snowNightBg from '../img/snowNightBg.png';

const getWeatherBackground = (
  weatherArray: ICurrentWeatherArray | undefined,
  night: boolean
) => {
  // console.log('weather', weatherArray, 'night:', night);

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
        return fogNightBg;
      case 'Snow':
        return snowNightBg;
      case 'Clear':
        return clearNightBg;
      default:
        return clearNightBg;
    }
  }
};

export default getWeatherBackground;
