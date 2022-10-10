import { mdiReload } from '@mdi/js';
import Icon from '@mdi/react';
import { ISvgColors } from 'interfaces';
import { useState } from 'react';

const Reload: React.FC<ISvgColors> = ({ svgColors }) => {
  const [iconInfo] = useState({
    path: mdiReload,
    color: svgColors,
    spin: 0
  });

  const { path, color, spin } = iconInfo;

  return (
    <Icon path={path} color={color} spin={spin} className="ReloadSvg" />
  );
};

export default Reload;
