import getTimeNow from "./getTimeNow";

const isNight = ():boolean => {

  const timeNow = getTimeNow();
  
  // night boolean check
  const condition1 = timeNow > 18;
  const condition2 = timeNow < 6;

  const night = condition1 || condition2;
  return night;
};
export default isNight;