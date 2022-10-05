import { mdiReload } from '@mdi/js';
import Icon from '@mdi/react';
import { ISvgColors } from 'interfaces';
import { useState } from 'react';

const ReloadSpinning: React.FC<ISvgColors> = ({ svgColors }) => {
  const [iconInfo] = useState({
    path: mdiReload,
    color: 'rgba(163, 230, 53, 0.3)',
    spin: 0.4
  });

  const { path, color, spin } = iconInfo;

  return (
    <Icon
      path={path}
      color={color}
      spin={spin}
      className="ReloadSvg"
    />
  );
};

export default ReloadSpinning;
