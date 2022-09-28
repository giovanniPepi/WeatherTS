import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';

const Loading = () => {
  const [iconInfo] = useState({
    path: mdiLoading,
    color: 'lightblue',
    spin: 0.3
  });

  const { path, color, spin } = iconInfo;

  return (
    <div className="loadingOverlay">
      <div className="loadingModal">
        <Icon
          path={path}
          color={color}
          spin={spin}
          className={'loadingIcon'}
        />
      </div>
    </div>
  );
};

export default Loading;
