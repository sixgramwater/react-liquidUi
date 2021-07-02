import React from 'react';
import { ThemeProps } from '../Icon';
import './index.less'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps; 
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props;

  return(
    <div className="liquid-progress" style={styles}> 
      <div className="liquid-progress-outer"
        style={{
          height: `${strokeHeight}px`
        }}
      >
        <div className={`liquid-progress-inner color-${theme}`}
          style={{
            width: `${percent}%`
          }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 14,
  showText: true,
  theme: 'primary',
}

export default Progress;