import React from 'react';
import Menu, { MenuProps } from './Menu';
import MenuItem, { MenuItemProps } from './menuItem';
import './index.less';
import Submenu, { SubmenuProps } from './subMenu';
export type IMenuComponent = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>;
  Submenu: React.FC<SubmenuProps>;
};

const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.Submenu = Submenu;

export default TransMenu;
