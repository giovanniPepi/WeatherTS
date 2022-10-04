import { mdiWhiteBalanceSunny } from '@mdi/js';
import Icon from '@mdi/react';

import { useState } from 'react';

const Sunny = () => {
  const [iconInfo] = useState({
    path: mdiWhiteBalanceSunny,
    color: 'orange',
    spin: 20
  });

  const { path, color, spin } = iconInfo;

  return (
    <Icon
      path={path}
      color={color}
      spin={spin}
      className="sunnySvg"
    />
  );
};

export default Sunny;
