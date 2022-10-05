const getDaysToRender = (): number => {
  const screenWidth = window.screen.availWidth;
  let daysToRender = 0;

  if (screenWidth < 650) daysToRender = 1;
  else if (screenWidth > 650) daysToRender = 2;

  return daysToRender;
};

export default getDaysToRender;
