import { Tooltip } from '@material-ui/core';
import { mdiTurbine } from '@mdi/js';
import Icon from '@mdi/react';
import { ISvgColors } from 'interfaces';

import { useState } from 'react';

const Windy: React.FC<ISvgColors> = ({ svgColors }) => {
  const [iconInfo] = useState({
    path: mdiTurbine,
    color: svgColors,
    spin: 3
  });

  const { path, color, spin } = iconInfo;

  return (
    <Tooltip title="Wind info" placement="left-start">
      <Icon
        path={path}
        color={color}
        spin={spin}
        className="windySvg"
      />
    </Tooltip>
  );
};

export default Windy;
