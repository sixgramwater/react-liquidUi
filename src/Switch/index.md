## Switch

demo

```tsx
import React, { useState } from 'react';
import { Switch } from 'liquidUi';

const app = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <p>checked: {checked ? 'checked' : 'unChecked'}</p>
      <Switch
        defaultChecked={checked}
        onChange={(checked) => {
          setChecked(checked);
        }}
      />
    </>
  );
};
export default app;
```
