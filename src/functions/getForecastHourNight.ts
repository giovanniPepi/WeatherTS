  const getForecastHourNight = (unix: number) => {
    const newDate = new Date(unix * 1000);
    const hours = newDate.getHours();

    const condition = hours >= 18 || hours <= 5;
        
    return condition;
  };

export default getForecastHourNight;