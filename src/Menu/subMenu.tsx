import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './menuItem';
import Transition from '../Transition';
import './index.less';
import Icon from '../Icon';

export interface SubmenuProps {
  index?: string;
  title: string;
  className?: string;
}

const Submenu: React.FC<SubmenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const isOpened = false;
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames('menu-item submenu-item', {
    'is-active': context.index === index,
    'is-open': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : [];

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};

  const renderChildren = () => {
    const submenuClasses = classNames('liquid-submenu', {
      'menu-opened': menuOpen,
    });

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElemet =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElemet.type.displayName === 'MenuItem') {
        return React.cloneElement(childElemet, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          'Warning: Submenu has a child which is not a type of MenuItem',
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} classNames="zoom-in-top">
        <ul className={submenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon type="MdKeyboardArrowDown"></Icon>
      </div>
      {renderChildren()}
    </li>
    // <CSSTransition
    //   in={menuOpen}
    //   timeout={300}
    //   classNames='zoom-in-top'
    // >
    //   <ul className={className}></ul>
    // </CSSTransition>
  );
};

Submenu.displayName = 'Submenu';

export default Submenu;
