import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { TabItemProps } from './tabItem';
import TabNav from './tabNav';
import './index.less';

type TabType = 'line' | 'card';
type SelectCallback = (selectedIndex: string) => void;

export interface TabsProps {
  type?: TabType;
  className?: string;
  defaultIndex?: string;
  onSelect?: SelectCallback;
}

export interface ITabsContext {
  index: string;
  onSelect?: SelectCallback;
}

export const TabsContext = createContext<ITabsContext>({
  index: '0',
});

const Tabs: React.FC<TabsProps> = (props) => {
  const { type, className, defaultIndex, onSelect, children } = props;

  const [activeIndex, setActive] = useState(defaultIndex);
  const classes = classNames(`liquid-tabs tabs-${type}`, className);
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index); // trigger callback
    }
  };
  const passedContext: ITabsContext = {
    index: activeIndex ? activeIndex : '0',
    onSelect: handleClick,
  };
  const inkbarStyle = {
    left: activeIndex ? parseInt(activeIndex) * (56 + 32) + 'px' : '0',
  };
  const renderChildren = () => {
    const tabsNavItems: React.ReactNode[] = [];
    const tabsContentItems = React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      if (childElement.type.displayName === 'TabItem') {
        const indexStr = index.toString();

        tabsNavItems.push(
          <TabNav key={indexStr} index={indexStr} {...childElement.props}>
            {childElement.props.label}
          </TabNav>,
        );

        return React.cloneElement(childElement, {
          index: indexStr,
        });
      }
    });

    return (
      <>
        <div className="tabs-bar">
          <div className="tabs-nav-container">
            {tabsNavItems}
            <div className="tab-ink-bar" style={inkbarStyle}></div>
          </div>
        </div>
        <div className="tabs-content">{tabsContentItems}</div>
      </>
    );
  };

  return (
    <div className={classes}>
      <TabsContext.Provider value={passedContext}>
        {renderChildren()}
      </TabsContext.Provider>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: '0',
  type: 'line',
};

export default Tabs;
