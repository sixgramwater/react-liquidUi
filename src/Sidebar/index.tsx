import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './index.less';
import classNames from 'classnames';

interface ISidebarProps {
  // width?: number;
  visible?: boolean;
  onMaskClick?: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  children,
  visible,
  onMaskClick,
}) => {
  // const [visible, setVisible] = React.useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(visible ? true : false);
  }, [visible]);
  const handleClickMask = () => {
    onMaskClick && onMaskClick();
    setShow(false);
  };
  return (
    <div className="sidebar">
      <div
        className={classNames(
          'sidebar-container',
          show ? 'visible' : 'inVisible',
        )}
      >
        {children}
      </div>
      <div
        className={classnames('sidebar-mask', show ? 'visible' : '')}
        onClick={handleClickMask}
      ></div>
      {/* <button onClick={()=>{setShow(!show)}}>click</button> */}
    </div>
  );
};

export default Sidebar;
