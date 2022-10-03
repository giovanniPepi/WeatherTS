import getTimeNow from "./getTimeNow";

const isNight = ():boolean => {

  const timeNow = getTimeNow();
  
  // night boolean check
  const condition = timeNow >= 18 || timeNow <= 5;
  
  const night = condition;

  return night;
};
export default isNight;