const getDaysToRender = (screenWidth: number): number => {
  let daysToRender = 0;

  if (screenWidth < 950) daysToRender = 1;
  else if (screenWidth >= 950) daysToRender = 2;

  return daysToRender;
};

export default getDaysToRender;
