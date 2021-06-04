import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
import Icon from '../Icon';

interface IInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent) => void;
  onIconClick?: (value: string) => void;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  autoFocus?: boolean;
  clearable?: boolean;
  type?: 'input' | 'password';
}

const Input: React.FC<IInputProps> = ({
  onChange,
  value,
  placeholder = '',
  defaultValue,
  className,
  onIconClick,
  icon,
  autoFocus = false,
  clearable = false,
  type = 'input',
}) => {
  let inputRef: any = React.useRef();
  const [inputValue, setInputValue] = React.useState(
    defaultValue ? defaultValue : '',
  );
  const handleChange = (e: any) => {
    setInputValue(inputRef.current.value);
    // if(!onChange) {
    //   return;
    // }
    let event = e;
    const originalInputValue = inputRef.current.value;
    if (e.type === 'click') {
      // console.log('clear');
      event = Object.create(e);
      event.target = inputRef.current;
      event.currentTarget = inputRef.current;
      // change target ref value cause e.target.value should be '' when clear input
      inputRef.current.value = '';
      onChange &&
        onChange(
          event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        );
      // reset target ref value
      // inputRef.current.value = originalInputValue;
      console.log(inputRef.current.value);
      return;
    }
    onChange && onChange(e);
    // console.log(e.target.value)
  };
  const handleClear = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('clear');
    // setInputValue('');
    handleChange(e);
  };
  const handleIconClick = (e: React.MouseEvent) => {
    onIconClick && onIconClick(inputRef.current.value);
  };
  React.useEffect(() => {
    autoFocus && inputRef.current.focus();
  }, []);
  return (
    <div className={styles.inputWrap}>
      <input
        type={type}
        ref={inputRef}
        className={classnames(
          styles.inputInner,
          className ? styles[className] : '',
          clearable ? styles.clearablePadding : '',
        )}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        // value={inputValue}
        // autoFocus
        // value={inputValue}
        // onInput={e=>setInputValue(e.target.value)}
      />
      {!!icon && (
        <span className={styles.inputIcon} onClick={handleIconClick}>
          {icon}
        </span>
      )}
      {clearable && (
        <span
          className={classnames(styles.inputIcon, styles.iconRotate)}
          onClick={handleClear}
        >
          <Icon type="MdClear" />
        </span>
      )}
    </div>
  );
};

export default Input;
