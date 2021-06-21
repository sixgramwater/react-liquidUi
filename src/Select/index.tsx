import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Icon from '../Icon';
import './index.less';
import classNames from 'classnames';

interface ISelectProps {
  onChange: () => void;
}

const useOutsideAlerter = (
  ref: React.MutableRefObject<HTMLDivElement>,
  callback: Function,
) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log('outside')
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

interface IOptionProps {
  onClick?: () => void;
  key?: any;
  active?: boolean;
}

const Option: React.FC<IOptionProps> = ({ children }) => {
  return <div className="select-item">{children}</div>;
};

const Select: React.FC<ISelectProps> = ({ children }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);
  const selectRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutsideAlerter(selectRef, () => {
    setFocused(false);
    setShowDropDown(false);
  });
  const options = ['Jack', 'Tommy', 'Lucy', 'Nancy'];
  const handleClickSelect = () => {
    setFocused(true);
    setShowDropDown(!showDropDown);
  };
  const handleClickOption = (index: number) => {
    setActiveOption(index);
    setShowDropDown(false);
  };
  const displayActiveOption = (index: number) => {
    if (index < 0 || index >= options.length) {
      return '';
    } else {
      return options[index];
    }
  };
  const handleClickOutside = () => {
    // if(e.target.className && e.target.className.search('select') === 0){
    //   console.log(e.target.className);
    //   return;
    // }
    setFocused(false);
    setShowDropDown(false);
    // console.log(e.target.className);
  };
  // useEffect(() => {
  //   document.addEventListener('click', handleClickDocument)
  //   return () => {
  //     document.removeEventListener('click', handleClickDocument)
  //   }
  // }, [])
  // document.addEventListener('click', (e) => {
  //   if(e.target && e.target.)
  //   setShowDropDown(false);
  // })
  return (
    <div
      className={classNames('select', focused ? 'select-focused' : '')}
      ref={selectRef}
    >
      <div className="select-selector" onClick={() => handleClickSelect()}>
        <span className="select-selection-item">
          {displayActiveOption(activeOption)}
        </span>
      </div>
      <span className="select-arrow" onClick={() => handleClickSelect()}>
        <Icon type="MdKeyboardArrowDown"></Icon>
      </span>
      {/* 需要dropdown && menu 两个组件 */}
      <CSSTransition
        in={showDropDown}
        classNames="slide-up"
        unmountOnExit
        timeout={300}
        onEnter={() => setShowDropDown(true)}
        onExited={() => setShowDropDown(false)}
      >
        <div className="select-dropdown">
          <div className="select-dropdown-wrap">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleClickOption(index)}
                className={classNames(
                  'select-item',
                  activeOption === index ? 'select-item-active' : '',
                )}
              >
                {option}
              </div>
            ))}
            {/* <div className="select-item">Lucy</div>
            <div className="select-item">Jack</div>
            <div className="select-item">Tommy</div> */}
          </div>
        </div>
        {/* {
        showDropDown && 
        <div className="select-dropdown">
          <div className="select-dropdown-wrap"></div>
        </div>
      } */}
      </CSSTransition>
    </div>
  );
};

export default Select;
