import React, { useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';

interface ITooltipProps {
  // children: React.ReactNode
  text?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({
  children,
  text = 'default tip',
  ...rest
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.tooltipContainer}>
      <div
        className={classnames(styles.tooltipBox, show ? styles.visible : '')}
      >
        {text}
        <span className={styles.tooltipArrow}></span>
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
