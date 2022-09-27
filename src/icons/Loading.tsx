import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

import { useState } from 'react';

const Loading = () => {
  const [iconInfo] = useState({
    path: mdiLoading,
    color: 'lightblue',
    size: 5,
    spin: 0.4
  });

  const { path, color, size, spin } = iconInfo;

  return (
    <div className="loadingOverlay">
      <div className="loadingModal">
        <Icon path={path} color={color} size={size} spin={spin} />
      </div>
    </div>
  );
};

export default Loading;
