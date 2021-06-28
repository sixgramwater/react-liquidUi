import React, { useEffect, useState } from 'react';
// import classnames from 'classnames';
import './index.less';
import classNames from 'classnames';
import Transition from '../Transition';
import { CSSTransition } from 'react-transition-group';

interface ISidebarProps {
  // width?: number;
  visible?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  children,
  visible = false,
  onClose,
  // onMaskClick,
}) => {
  // const [visible, setVisible] = React.useState(false);
  // const [show, setShow] = useState(false);
  // useEffect(() => {
  //   setShow(visible ? true : false);
  // }, [visible]);
  const handleClickMask = () => {
    onClose && onClose();
    // setShow(false);
  };
  return (
    // <CSSTransition
    //     in={visible}
    //     classNames="slide-in"
    //     timeout={300}
    //     unmountOnExit
    //   >
    <div className="sidebar">
      <div
        className={classNames(
          'sidebar-container',
          visible ? 'visible' : 'invisible',
        )}
      >
        {children}
      </div>
      <div
        className={classNames('sidebar-mask', visible ? 'visible' : '')}
        onClick={onClose}
      ></div>
      {/* <button onClick={()=>{setShow(!show)}}>click</button> */}
    </div>
    // </CSSTransition>
  );
};

export default Sidebar;
