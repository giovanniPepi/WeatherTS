const getMinute = () => {
  const newDate = new Date();
  
    const minute = newDate.getMinutes();
    
    if (minute >= 0 && minute < 10) return `0${minute}`
    else return minute;


}

export default getMinute;