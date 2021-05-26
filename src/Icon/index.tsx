import * as Fa from 'react-icons/fa';
import * as Md from 'react-icons/md';
// import {  } from 'react-icons';
import React from 'react';
import styles from './index.less';

interface IconProps {
  type: keyof typeof Md;
  size?: string;
  // rotation: number,
  style?: any;
}

const Icon: React.FC<IconProps> = ({ type, size, style }) => {
  const IconComponent = Md[type];
  return <IconComponent size={size} style={style} />;
};

export default Icon;
