import Clouds from "src/icons/Clouds";
import MoonClear from "src/icons/MoonClear";
import Rain from "src/icons/Rain";
import Sunny from "src/icons/Sunny";

import isNight from "./isNight";


const getWeatherIcon = (weatherDesc: string) => {

  // console.log(weatherDesc);
  const night:Boolean = isNight();
  

  if (night) {
    switch (weatherDesc) {
      case 'Clear':
      return <MoonClear/>
    }
  } else {
    switch (weatherDesc) {
      case 'Clear':
      return <Sunny/>
      case 'Clouds':
        return <Clouds night={night} />
      case 'Rain':
      case 'Drizzle': 
        return <Rain night={night}/>

    }
  }
}

export default getWeatherIcon