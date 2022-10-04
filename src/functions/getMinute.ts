const getMinute = (timezone: string) => {
  
  if (!timezone) {
  const newDate = new Date();
  
    const minute = newDate.getMinutes();
    
    if (minute >= 0 && minute < 10) return `0${minute}`
    else return minute;
  } else {
  const localHour = new Date(
    new Date().toLocaleString('en-US', { timeZone: `${timezone}` })
  );
    const minute = localHour.getMinutes();
    if (minute >= 0 && minute < 10) return `0${minute}`
    return minute;
  }
  


  

}

export default getMinute;