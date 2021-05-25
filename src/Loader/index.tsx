import React from 'react';
import styles from './index.less';
import classnames from 'classnames';

interface ILoaderProps {
  show: boolean;
  size?: number;
  hasMask?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({
  show = false,
  size = 24,
  hasMask = false,
}) => {
  return (
    <div className={styles.loaderContainer}>
      <svg
        className={styles.loader}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
      <div
        className={classnames(styles.mask, hasMask ? styles.visible : '')}
      ></div>
    </div>
  );
};

export default Loader;
