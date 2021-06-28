import React, { useEffect } from 'react';
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
export default useOutsideAlerter;
