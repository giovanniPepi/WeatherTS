import Sunny from "src/icons/Sunny";
import isNight from "./isNight";


const getWeatherIcon = (weatherDesc: string) => {

  // console.log(weatherDesc);
  const night = isNight();
  

  if (night) {
    switch (weatherDesc) {
      case 'Clear':
      return <Sunny/>
    }
  } else {
    switch (weatherDesc) {
      case 'Clear':
      return <Sunny/>
    }
  }
}

export default getWeatherIcon