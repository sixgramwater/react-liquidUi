## Input

```tsx
import React from 'react';
import { Input } from 'liquidUi';

export default () => {
  const [value, setValue] = React.useState('');
  return (
    <>
      input: {value}
      <br />
      <Input
        // value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
```
