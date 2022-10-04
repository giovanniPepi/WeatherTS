const getHoursToRender = (): number => {
  const screenWidth = window.screen.availWidth;
  let HoursToRender = 0;

  if (screenWidth < 650) HoursToRender = 2;
  else if (screenWidth > 650) HoursToRender = 8;

  console.log('getting hours to render: ', HoursToRender);

  return HoursToRender;
};

export default getHoursToRender;
