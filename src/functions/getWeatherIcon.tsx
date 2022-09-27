import Clouds from 'src/icons/Clouds';
import Mist from 'src/icons/Mist';
import MoonClear from 'src/icons/MoonClear';
import Rain from 'src/icons/Rain';
import Snow from 'src/icons/Snow';
import Sunny from 'src/icons/Sunny';
import Thunderstorm from 'src/icons/Thunderstorm';

import isNight from './isNight';

const getWeatherIcon = (weatherDesc: string) => {
  // console.log(weatherDesc);
  const night: Boolean = isNight();

  if (night) {
    switch (weatherDesc) {
      case 'Clear':
        return <MoonClear />;
      default:
        console.log(
          'Error in weather',
          weatherDesc,
          'check getWeatherIcon'
        );
    }
  } else {
    switch (weatherDesc) {
      case 'Clear':
        return <Sunny />;
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
          'Error in weather',
          weatherDesc,
          'check getWeatherIcon'
        );
    }
  }
};

export default getWeatherIcon;
