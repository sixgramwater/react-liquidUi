import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsContext } from './tabs';
import './index.less';

export interface TabItemProps {
  label: string | React.ReactNode;
  index?: string;
  className?: string;
  disabled?: boolean;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const {
    // label,
    index,
    className,
    // disabled,
    children,
  } = props;
  const context = useContext(TabsContext);
  const classes = classNames('tab-item', className, {
    'is-active': context.index === index,
  });
  return <div className={classes}>{children}</div>;
};

TabItem.displayName = 'TabItem';

export default TabItem;
