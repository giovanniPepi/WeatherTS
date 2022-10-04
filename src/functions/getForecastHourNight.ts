  const getForecastHourNight = (unix: number) => {
    const newDate = new Date(unix * 1000);
    const hours = newDate.getHours();

    console.log(hours);

    const condition = hours >= 18 || hours <= 5;
    console.log(condition);
  
    
    return condition;
  };

export default getForecastHourNight;