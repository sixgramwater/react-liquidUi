import React from 'react';
import styles from './index.less';
import classnames from 'classnames';

interface IInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent) => void;
  onIconClick?: (value: string) => void;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  autoFocus?: boolean;
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
}) => {
  let inputRef: any = React.useRef();
  // const [inputValue, setInputValue] = React.useState(defaultValue?defaultValue:'');
  const handleChange = (e: any) => {
    onChange && onChange(e);
    // console.log(e.target.value)
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
        type="text"
        ref={inputRef}
        className={classnames(
          styles.inputInner,
          className ? styles[className] : '',
        )}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        // autoFocus
        // value={inputValue}
        // onInput={e=>setInputValue(e.target.value)}
      />
      {!!icon && (
        <span className={styles.inputIcon} onClick={handleIconClick}>
          {icon}
        </span>
      )}
    </div>
  );
};

export default Input;
