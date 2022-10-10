const getHoursToRender = (screenWidth: number): number => {
  let HoursToRender = 0;
  if (screenWidth < 950) HoursToRender = 4;
  else if (screenWidth >= 950) HoursToRender = 8;

  return HoursToRender;
};

export default getHoursToRender;
