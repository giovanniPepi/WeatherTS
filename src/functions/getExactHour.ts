const getExactHours = (unix: number) => {
  const newDate = new Date(unix * 1000);
  
  const minute = newDate.getMinutes();

  // getMinutes() returns values as 19:2, so we add 0 before
  if (minute >= 0 && minute < 10) {
    const exactHours = `${newDate.getHours()}:0${minute}`;
    return exactHours
  } else {
    const exactHours = `${newDate.getHours()}:${newDate.getMinutes()}`;
    return exactHours
  }
}

export default getExactHours;