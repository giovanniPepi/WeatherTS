import { Tooltip } from '@material-ui/core';
import { mdiTurbine } from '@mdi/js';
import Icon from '@mdi/react';

import { useState } from 'react';

const Windy = () => {
  const [iconInfo] = useState({
    path: mdiTurbine,
    color: '',
    spin: 8
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
