const getUVSeverity = (uv: number) => {

  let uvlvl; 

  switch (true) {
    case uv >= 0 && uv <= 2:
      uvlvl = 'Low';
      break;
    case uv > 2 && uv <= 5:
      uvlvl = 'Moderate';
      break;
    case uv > 5 && uv <= 7:
      uvlvl = 'High';
      break;
    case uv > 7 && uv <= 10:
      uvlvl = 'Very high';
      break;
    case uv > 10:
      uvlvl = 'Extreme';
      break;
  }

  return uvlvl;
}

export default getUVSeverity;
