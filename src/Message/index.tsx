import React, { useState, useEffect } from 'react';
// import classNames from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import Transition from '../Transition';
import ReactDOM from 'react-dom';
import Message, { MessageType } from './message';
import './index.less';

interface MessageApi {
  info: (text: string) => void;
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
}

interface Notice {
  text: string;
  key: string;
  type: MessageType;
}

let seed = 0;
const now = Date.now();
const getUuid = (): string => {
  const id = seed;
  seed += 1;
  return `MESSAGE_${now}_${id}`;
};

let add: (notice: Notice) => void;
const MessageContainer = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const timeout = 3 * 1000;
  const maxCount = 10;

  const remove = (notice: Notice) => {
    const { key } = notice;
    setNotices((prevNotice) =>
      prevNotice.filter((notice) => notice.key !== key),
    );
  };

  add = (notice: Notice) => {
    setNotices((prevNotice) => [...prevNotice, notice]);
    setTimeout(() => {
      remove(notice);
    }, timeout);
  };

  return (
    <div className="message-container">
      <TransitionGroup>
        {notices.map(({ text, key, type }) => (
          <Transition
            in
            timeout={200}
            key={key}
            animation="slide-in-top"
            classNames="slide-in-top"
          >
            <Message type={type} text={text} />
          </Transition>
        ))}
      </TransitionGroup>
    </div>
  );
};

let el = document.querySelector('#message-wrapper');
if (!el) {
  el = document.createElement('div');
  el.className = 'message-wrapper';
  el.id = 'message-wrapper';
  document.body.append(el);
}

ReactDOM.render(<MessageContainer />, el);

const api: MessageApi = {
  info: (text) => {
    add({
      text,
      key: getUuid(),
      type: 'info',
    });
  },
  success: (text) => {
    add({
      text,
      key: getUuid(),
      type: 'success',
    });
  },
  warning: (text) => {
    add({
      text,
      key: getUuid(),
      type: 'warning',
    });
  },
  error: (text) => {
    add({
      text,
      key: getUuid(),
      type: 'danger',
    });
  },
};

export default api;
