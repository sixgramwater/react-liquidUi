import React, { MouseEventHandler, useState, useEffect } from 'react';
import Loader from '../Loader';
import styles from './index.less';
import classnames from 'classnames';

interface IButtonProps {
  type?: 'primary' | 'warning' | 'success' | 'info' | 'plain';
  size?: 'large' | 'medium' | 'small' | 'mini';
  onClick?: MouseEventHandler;
  disabled?: boolean;
  ripple?: boolean;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  type,
  size,
  onClick,
  disabled,
  ripple = false,
  loading = false,
}) => {
  const [isRipple, setIsRipple] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRipple(true);
      setTimeout(() => setIsRipple(false), 300);
    } else setIsRipple(false);
  }, [coords]);

  useEffect(() => {
    if (!isRipple) setCoords({ x: -1, y: -1 });
  }, [isRipple]);

  return (
    <button
      className={classnames(
        styles.button,
        type ? styles[type] : styles.primary,
        ripple ? '' : styles.btnHover,
      )}
      onClick={(e) => {
        const node = e.target as HTMLElement;
        const rect = node.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {loading ? (
        <>
          <div className={styles.loadingContainer}>
            <Loader show={loading} color="#fff" size={16}></Loader>
          </div>
          <span className={styles.loadingTip}>loading</span>
        </>
      ) : (
        ''
      )}

      {ripple && isRipple ? (
        <span
          className={styles.ripple}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
      {!loading && <span className={styles.content}>{children}</span>}
    </button>
  );
};

export default Button;
