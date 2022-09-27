import { mdiSnowflake } from '@mdi/js'; 
import Icon from "@mdi/react";
import { NightProps } from 'interfaces';

import { useState } from "react";

const Snow:React.FC<NightProps> = ({night}) => {
   const [iconInfo] = useState({
    path: mdiSnowflake,
    color: '',
    size: 1,
  });

  let { path, color, size } = iconInfo;

  // changes color
  if (night) {
  color = 'lightblue'
  return <Icon path={path} color={color} size={size}  />;
}
  else 
    return <Icon path={path} color={color} size={size}  />;

};

export default Snow;