import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

import { useState } from 'react';

const Loading = () => {
  const [iconInfo] = useState({
    path: mdiLoading,
    color: 'lightblue',
    size: 1,
    spin: 0.4
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default Loading;
