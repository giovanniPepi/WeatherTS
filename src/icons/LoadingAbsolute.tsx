import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { ISvgColors } from 'interfaces';
import { useState } from 'react';

const LoadingAbsolute: React.FC<ISvgColors> = ({ svgColors }) => {
  const [iconInfo] = useState({
    path: mdiLoading,
    color: svgColors,
    spin: 0.3
  });

  const { path, color, spin } = iconInfo;

  return (
    <div className="loadingSvgAbsolute">
      <Icon
        path={path}
        color={color}
        spin={spin}
        className={'loadingIconAbsolute'}
      />
    </div>
  );
};

export default LoadingAbsolute;
