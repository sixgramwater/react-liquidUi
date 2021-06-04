import React, { ReactNode, useState, useEffect } from 'react';
import styles from './index.less';
import classnames from 'classnames';

type tooltipPlacement = 'top' | 'bottom';

interface ITooltipProps {
  // children: React.ReactNode
  text?: string;
  showDelay?: number;
  hideDelay?: number;
  placement?: tooltipPlacement;
}

const Tooltip: React.FC<ITooltipProps> = ({
  children,
  text = 'default tip',
  showDelay = 300,
  hideDelay = 300,
  placement = 'bottom',
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const toolboxRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const [hoverX, setHoverX] = useState(-1);
  const [positionX, setPositionX] = useState(0);
  let timerRef = React.useRef() as React.MutableRefObject<any>;
  let timerLeaveRef = React.useRef() as React.MutableRefObject<any>;
  useEffect(() => {
    if (toolboxRef.current !== null) {
      let posX = toolboxRef.current.getBoundingClientRect().left;
      setPositionX(hoverX - posX);
      console.log(hoverX - posX);
    }
  }, [hoverX]);
  const handleMouseEnter = (e: any) => {
    if (timerLeaveRef.current) {
      clearTimeout(timerLeaveRef.current);
      timerLeaveRef.current = null;
    }
    if (timerRef.current) return;
    setHoverX(e.pageX);
    let hoverX = e.pageX;
    if (showDelay) {
      timerRef.current = setTimeout(() => {
        setHoverX(hoverX);
        setShow(true);
      }, showDelay);
    }
    // setShow(true);
    console.log(hoverX);
  };
  const handleMouseLeave = (e: any) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (timerLeaveRef.current) return;
    if (hideDelay) {
      timerLeaveRef.current = setTimeout(() => {
        setShow(false);
      }, hideDelay);
    }
    // setShow(false);
  };
  return (
    <div className={styles.tooltipContainer} ref={toolboxRef}>
      <div
        className={classnames(
          styles.tooltipBox,
          show ? styles.visible : '',
          placement === 'top' ? styles.top : styles.bottom,
        )}
        style={{ left: `${positionX - 50}px` }}
      >
        {text}
        <span
          className={classnames(
            styles.tooltipArrow,
            placement === 'top' ? styles.up : styles.down,
          )}
        ></span>
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
