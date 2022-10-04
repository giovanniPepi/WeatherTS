const getDaysToRender = (): number => {
  const screenWidth = window.screen.availWidth;
  console.log(screenWidth);
  let daysToRender = 0;

  if (screenWidth < 650) daysToRender = 1;
  else if (screenWidth > 650) daysToRender = 2;

  console.log('getting days to render: ', daysToRender);
  return daysToRender;
};

export default getDaysToRender;
