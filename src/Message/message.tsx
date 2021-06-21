import React from 'react';
import Icon from '../Icon';
import './index.less';

export type MessageType = 'info' | 'success' | 'danger' | 'warning';

interface IMessageProps {
  text: string;
  type: MessageType;
}

const iconColor = {
  success: '#52c41a',
  warning: '#fa541c',
  info: '#1890ff',
  danger: '#f5222d',
};

const Message: React.FC<IMessageProps> = ({ text, type }) => {
  const renderIcon = (messageType: MessageType) => {
    let messageIcon: any;
    let color = iconColor[messageType];
    switch (messageType) {
      case 'success':
        messageIcon = 'MdCheckCircle';
        break;
      case 'danger':
        messageIcon = 'MdCheckCircle';
        break;
      case 'warning':
        messageIcon = 'MdCheckCircle';
        break;
      case 'info':
      default:
        messageIcon = 'MdCheckCircle';
        break;
    }
    return <Icon type={messageIcon} style={{ color }} />;
  };
  return (
    <div className="message">
      <div className="message-content">
        <div className="icon">{renderIcon(type)}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default Message;
