import { useEffect, useState } from 'react';

// 传入value: 频繁变化，返回debouncedValue：无论value更新多么频繁，delay timeout结束以后才更新debounceValue
const useDebounce = (value: any, delay = 300) => {
  const [debouncedValue, setDeboucedValue] = useState(value);
  useEffect(() => {
    let handler = window.setTimeout(() => {
      setDeboucedValue(value);
    }, delay);
    return () => {
      window.clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
