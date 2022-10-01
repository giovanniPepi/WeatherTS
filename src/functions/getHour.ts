const getHour = () => {
  const newDate = new Date();
  
    const hours = newDate.getHours();    
    if (hours >= 0 && hours < 10) return `0${hours}`
    else return hours;

}

export default getHour;