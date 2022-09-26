const getFormattedDate = (unix: number): string => {
  const newDate = new Date(unix * 1000);

  const getDay = () => {
    const day = newDate.getDate();
    if (day >= 0 && day < 10) {
      return `0${day}`
    } else return day;    
  }
  
  const getMonth = () => {
    const month = newDate.getMonth() + 1;
    
    if (month >= 0 && month < 10) {
      return `0${month}`;
    } else return month;

  }

  const getWeekDay = () => {
    const weekDay = newDate.getDay();

    switch (weekDay) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
    return weekDay;
  }

  const formattedDate = `${getWeekDay()}, ${getDay()}/${getMonth()}`;
  return formattedDate;
}

export default getFormattedDate;