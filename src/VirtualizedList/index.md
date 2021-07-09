## VirtualizedList

| api          | type     | description                                         |
| ------------ | -------- | --------------------------------------------------- |
| itemHeight   | number   | list 中每个 item 的高度                             |
| numItem      | number   | list 中 item 的数量                                 |
| windowHeight | number   | 整个外层 window 的高度                              |
| itemRenderer | function | 自定义如何渲染每一个 item 的函数，返回 ReactElement |

### demo

```tsx
import React from 'react';
import { VirtualizedList } from 'liquidUi';

export default () => {
  //
  return (
    // <>
    <VirtualizedList
      itemHeight={36}
      numItem={100}
      windowHeight={400}
      itemRenderer={(item) => (
        <div key={item.index} style={{ ...item.style, height: '36px' }}>
          list:{item.index}
        </div>
      )}
    />
    // </>
  );
};
```
