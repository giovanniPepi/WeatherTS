
const isNight = (timezone: string): boolean => {
  
  if (!timezone) return false;
  
  const localHour = new Date(
    new Date().toLocaleString('en-US', { timeZone: `${timezone}` })
  );
  const hours = localHour.getHours();

      
  // night boolean check
  const condition = hours >= 18 || hours <= 5;
  
  const night = condition;

  console.log(night, hours);
  return night;
};
export default isNight;