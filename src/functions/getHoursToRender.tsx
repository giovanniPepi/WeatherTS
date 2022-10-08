const getHoursToRender = (screenWidth: number): number => {
  let HoursToRender = 0;

  if (screenWidth < 950) HoursToRender = 2;
  else if (screenWidth >= 950) HoursToRender = 8;

  return HoursToRender;
};

export default getHoursToRender;
