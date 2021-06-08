import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './index.less';

interface ISwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch: React.FC<ISwitchProps> = ({
  defaultChecked = true,
  onChange,
  disabled = false,
}) => {
  const [switchCheck, setSwitchCheck] = React.useState(defaultChecked);

  const onSwitchClick = () => {
    if (disabled) return;
    setSwitchCheck(!switchCheck);
    onChange && onChange(!switchCheck);
  };
  return (
    <button
      className={classnames(
        'switch',
        switchCheck ? 'switch-checked' : '',
        disabled ? 'switch-disabled' : '',
      )}
      onClick={() => onSwitchClick()}
    >
      <div
        className={classnames('switch-handle', switchCheck ? 'checked' : '')}
      ></div>
    </button>
  );
};

export default Switch;
