import Clouds from "src/icons/Clouds";
import MoonClear from "src/icons/MoonClear";
import Sunny from "src/icons/Sunny";

import isNight from "./isNight";


const getWeatherIcon = (weatherDesc: string) => {

  // console.log(weatherDesc);
  const night:Boolean = isNight();
  

  if (night) {
    switch (weatherDesc) {
      case 'Clear':
      return <MoonClear/>
      case 'Clouds':
        return <Clouds night={night} />
    }
  } else {
    switch (weatherDesc) {
      case 'Clear':
      return <Sunny/>
      case 'Clouds':
        return <Clouds night={night} />
    }
  }
}

export default getWeatherIcon