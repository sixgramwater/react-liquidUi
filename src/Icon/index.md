## Icon

在 react-icons 的基础上进行了一层封装

### 基本用法

```tsx
import React from 'react';
import { Icon } from 'liquidUi';

export default () => {
  return (
    <>
      <Icon type="MdSearch" />
    </>
  );
};
```

### 在其他组件中使用

```tsx
import React from 'react';
import { Icon, Input } from 'liquidUi';

export default () => {
  return (
    <>
      <Input icon={<Icon type="MdSearch" />} />
    </>
  );
};
```

### theme
```tsx
import React from 'react';
import { Icon } from 'liquidUi';

export default () => {
  return(
    <Icon  type="MdSearch" theme="info"/>
  )
  

}
```
