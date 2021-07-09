import React, { useState, useEffect } from 'react';
import './index.less';

type listItemType = {
  index: number;
  style: React.CSSProperties;
};

interface VirtualizedListProps {
  /* 单个item的高度 **/
  itemHeight: number;
  /* item的数量 **/
  numItem: number;
  /* 整个外层window的高度 **/
  windowHeight: number;
  /* 整个item的renderer **/
  itemRenderer: (item: listItemType) => React.ReactElement;
}

const VirtualizedList: React.FC<VirtualizedListProps> = (props) => {
  const { itemHeight, windowHeight, numItem, itemRenderer } = props;
  const [scrollTop, setScrollTop] = useState(0);
  // const [innerHeight, setInnerHeight] = useState(numItem * itemHeight);
  // const [items, setItems] = useState<listItemType[]>([]);
  const [renderedItems, setRenderedItems] = useState<React.ReactElement[] | []>(
    [],
  );
  const innerHeight = numItem * itemHeight;
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    // let items: listItemType[] = [];
    let tempItems: listItemType[] = [];
    // boundaryOffset 指的是上下边界多渲染的个数
    const boundaryOffset = 3;
    const startIndex = Math.max(
      Math.floor(scrollTop / itemHeight) - boundaryOffset,
      0,
    );
    const endIndex = Math.min(
      numItem - 1,
      Math.floor((scrollTop + windowHeight) / itemHeight) + boundaryOffset,
    );
    // console.log("startIndex", startIndex);
    // console.log("endIndex", endIndex)
    // const innerHeight = numItem * itemHeight;
    for (let i = startIndex; i < endIndex; i++) {
      tempItems.push({
        index: i,
        style: {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          width: '100%',
        },
      });
    }
    const mappedItems = tempItems.map((item) => itemRenderer(item));
    // console.log(mappedItems.length)
    // const renderedItems = itemRenderer? tempItems.map(item=>itemRenderer(item)) : renderedItems;
    setRenderedItems(mappedItems as React.ReactElement[]);
    // setItems(tempItems);
  }, [scrollTop]);

  // const renderItems = () => {
  //   items.map(item=>{
  //     return(
  //       <div key={item.index} className="virtualized-list-item" style={item.style}></div>
  //     )
  //   })
  // }
  return (
    <div className="liquid-virtualized-list">
      <div
        className="outer"
        onScroll={handleScroll}
        style={{
          height: `${windowHeight}px`,
        }}
      >
        <div
          className="inner"
          style={{
            height: `${innerHeight}px`,
            position: 'relative',
          }}
        >
          {renderedItems}
          {/* {itemRenderer? renderedItems: renderItems} */}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
