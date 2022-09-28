import { mdiWhiteBalanceSunny } from '@mdi/js';
import Icon from '@mdi/react';

import { useState } from 'react';

const Sunny = () => {
  const [iconInfo] = useState({
    path: mdiWhiteBalanceSunny,
    color: 'orange',
    size: 1,
    spin: 20
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default Sunny;
