import React, { useState, useEffect } from 'react';
import Button from '../Button';
import './index.less';
import classNames from 'classnames';

interface IModalProps {
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  title?: string;
  closable?: boolean;
  okText?: string;
  cancelText?: string;
  mask?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  visible = true,
  mask = true,
  onOk,
  onCancel,
  width = 520,
  title = 'Modal Title',
  closable = true,
  okText = '确认',
  cancelText = '取消',
}) => {
  // const [visible, setVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(!visible);
  useEffect(() => {
    setIsHidden(!visible);
  }, [visible]);
  const handleOK = () => {
    // setIsHidden(true);
    onOk && onOk();
  };
  const handleCancel = () => {
    // setIsHidden(true);
    onCancel && onCancel();
  };
  const handleMaskClick = () => {};
  return (
    <div
      className="modal-root"
      style={{ display: isHidden ? 'none' : 'block' }}
    >
      <div className="modal-wrap">
        <div className="modal" style={{ width }}>
          <div className="modal-content">
            {closable && <div className="modal-close"></div>}

            <div className="modal-header">
              <div className="modal-header-title">{title}</div>
            </div>
            <div className="modal-body">
              <p>Some content</p>
              <p>Some content</p>
              <p>Some content</p>
              {children}
            </div>
            <div className="modal-footer">
              <Button type="plain" onClick={() => handleCancel()}>
                {okText}
              </Button>
              <Button onClick={() => handleOK()}>{cancelText}</Button>
            </div>
          </div>
        </div>
      </div>
      {mask && <div className="mask" onClick={() => handleMaskClick()}></div>}
    </div>
  );
};

export default Modal;
