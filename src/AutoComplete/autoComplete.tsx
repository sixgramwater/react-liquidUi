import React, { useState, useEffect, useRef } from 'react';
import className from 'classnames';
import Input, { InputProps } from '../Input';
import Loader from '../Loader';
import useOutsideAlerter from '../Hooks/useOutsideAlerter';
import useDebounce from '../Hooks/useDebounce';
import Transition from '../Transition';
import './index.less';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onChange'> {
  fetchSuggestions: (
    str: string,
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => React.ReactElement;
  onChange?: (data: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    defaultValue,
    onChange,
    ...restProps
  } = props;
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [inputValue, setInputValue] = useState(defaultValue as string);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); // items highlighted in suggestion list
  const debouncedValue = useDebounce(inputValue); // debounce
  const triggerSearch = useRef(false);
  const autoCompleteRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutsideAlerter(autoCompleteRef, () => {
    setShowDropdown(false);
    setLoading(false);
  });
  // useOutsideAlerter()
  useEffect(() => {
    // debouncedValue不为空, 且不是一开始的默认值
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        setSuggestions([]);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          // optional
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    onChange && onChange(value);
    triggerSearch.current = true;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const handleSelectItem = (item: DataSourceType) => {
    setInputValue(item.value);
    onChange && onChange(item.value);
    triggerSearch.current = false;
    setTimeout(() => {
      setShowDropdown(false);
      // setSuggestions([]);
    }, 300);
    onSelect && onSelect(item);
  };
  const renderDropdown = () => {
    return (
      <Transition
        timeout={300}
        classNames="zoom-in-top"
        in={showDropdown || loading}
      >
        <ul className="liquid-suggestion-list">
          {loading && (
            <div className="liquid-suggestion-loading">
              <Loader show={true} className="liquid-suggestion-loading" />
            </div>
          )}
          {suggestions.map((item, index) => {
            const itemClass = className('suggestion-item', {
              'is-active': index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={itemClass}
                onClick={() => {
                  handleSelectItem(item);
                  setHighlightIndex(index);
                }}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="liquid-auto-complete" ref={autoCompleteRef}>
      <Input
        value={inputValue}
        onChange={(e) => handleChange(e)}
        // defaultValue={defaultValue}
      />
      {renderDropdown()}
    </div>
  );
};

export default AutoComplete;
