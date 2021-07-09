import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.less';

interface InfiniteScrollProps {
  onBottomHit: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loader?: React.ReactElement;
  endMessage?: React.ReactElement;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
  const {
    hasMore,
    onBottomHit,
    isLoading,
    loader,
    endMessage,
    className,
    children,
  } = props;
  const observerRef = useRef() as React.MutableRefObject<IntersectionObserver>;
  const [ratio, setRatio] = useState(0);
  useEffect(() => {
    const options = {
      root: document.getElementById('observer'),
      threshold: 0.1,
    };
    observerRef.current = new IntersectionObserver((entries) => {
      // const entry = entries[0];
      if (entries[0].intersectionRatio <= 0) return;
      handleFetch();
      // setRatio(entry)
      // if(entry.isIntersecting) {
      //   handleFetch();
      // }
    }, options);
    // const footer = document.getElementById('inf-footer');
    // if(footer) {
    //   observerRef.current.observe(footer)
    //   console.log('observed')
    // }
  }, []);
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (footer) {
      observerRef.current.observe(footer);
      console.log('observed');
    }
  }, []);
  const handleFetch = () => {
    console.log('hit bottom');
    if (hasMore) {
      onBottomHit();
    }
  };
  return (
    <div className={classNames('liquid-infinite-scroll', className)}>
      <div className="infinite-scroll-list">{children}</div>
      <div className="infinite-scroll-footer" id="footer">
        {/* footer
        ratio:{ratio} */}
        {isLoading && (
          <div className="infinite-scroll-loader">
            {loader ? loader : <h3>loading...</h3>}
          </div>
        )}
        {!hasMore && (
          <div className="infinite-scroll-end-message">
            {endMessage ? endMessage : <h3>this is the end</h3>}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
