import * as Fa from 'react-icons/fa';
import * as Md from 'react-icons/md';
import {IconBaseProps} from 'react-icons';
// import {  } from 'react-icons';
import React from 'react';
import './index.less';
import classNames from 'classnames';

export type ThemeProps =
  'primary' |
  'secondary' |
  'success' |
  'info' |
  'warning' |
  'danger'

interface IconProps extends IconBaseProps {

  type: keyof typeof Md;
  size?: string;
  // rotation: number,
  style?: React.CSSProperties;
  theme?: ThemeProps;
  onClick?: (e: React.MouseEvent)=>void;
}

const Icon: React.FC<IconProps> = (props) => {
  const { 
    type, 
    size, 
    style, 
    className,
    theme,
    onClick,
  } = props;
  const classes = classNames('liquid-icon', className, theme?`icon-${theme}`:'');
  const IconComponent = Md[type];
  return (
    <span className={classes} onClick={onClick}>
      <IconComponent size={size} style={style}/>
    </span>
  ) 
 
};

export default Icon;
