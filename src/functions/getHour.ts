const getHour = (timezone: string) => {
  
  if (!timezone) {
const newDate = new Date();
  
    const hours = newDate.getHours();    
    if (hours >= 0 && hours < 10) return `0${hours}`
    else return hours;
  }
  else {
  const localHour = new Date(
    new Date().toLocaleString('en-US', { timeZone: `${timezone}` })
  );
    const hours = localHour.getHours();
    if (hours >= 0 && hours < 10) return `0${hours}`
    return hours;
  }
  
}

export default getHour;