import { mdiAlert } from '@mdi/js'; 
import Icon from "@mdi/react";

import { useState } from "react";

const Alert = () => {
  const [iconInfo] = useState({
    path: mdiAlert,
    color: "#FDE047",
    size: 1,
  });

  const { path, color, size } = iconInfo;

  return <Icon path={path} color={color} size={size}  />;
};

export default Alert;