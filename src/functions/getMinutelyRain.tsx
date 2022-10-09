import { Minutely } from 'interfaces';

const getMinutelyRain = (minuteArray: Minutely) => {
  if (minuteArray === undefined) return 0;

  const pptArray: number[] = [];

  // gets only ppt values from the minute array
  minuteArray.forEach((obj) => {
    let values = Object.values(obj);
    pptArray.push(values[1]);
  });

  // temp number to hold the highest
  let temp = 0;

  //returns the highest value found;
  pptArray.forEach((element) => {
    if (temp < element) {
      temp = element;
    }
  });

  return temp;
};

export default getMinutelyRain;
