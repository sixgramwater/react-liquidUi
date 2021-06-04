## Input

最常见的表单元素之一

### 使用 onChange

```tsx
import React from 'react';
import { Input } from 'liquidUi';

export default () => {
  const [value, setValue] = React.useState('');
  return (
    <>
      input: {value}
      <br />
      <br />
      <Input
        // value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
```

### 清空

```tsx
import React from 'react';
import { Input } from 'liquidUi';

export default () => {
  const [value, setValue] = React.useState('');
  return (
    <>
      input: {value}
      <br />
      <br />
      <Input clearable={true} onChange={(e) => setValue(e.target.value)} />
    </>
  );
};
```

### 密码

```tsx
import React from 'react';
import { Input } from 'liquidUi';

export default () => {
  // const [value, setValue] = React.useState('');
  return (
    <>
      <Input type="password" />
    </>
  );
};
```
