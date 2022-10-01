const getExactHours = (unix: number) => {
  const newDate = new Date(unix * 1000);
  
  const getHours = () => {
    const hours = newDate.getHours();
    
    if (hours >= 0 && hours < 10) return `0${hours}`
    else return hours;
  }

  const getMinutes = () => {
    const minute = newDate.getMinutes();
    
    if (minute >= 0 && minute < 10) return `0${minute}`
    else return minute;
  }
  

  const exactHours = `${getHours()}:${getMinutes()}`;
  return exactHours;

}

export default getExactHours;