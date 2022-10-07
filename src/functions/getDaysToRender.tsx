const getDaysToRender = (): number => {
  const screenWidth = window.screen.availWidth;
  let daysToRender = 0;

  if (screenWidth < 950) daysToRender = 1;
  else if (screenWidth >= 950) daysToRender = 3;

  return daysToRender;
};

export default getDaysToRender;
