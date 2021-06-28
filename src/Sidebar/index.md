## Sidebar

Demo:

```tsx
import React from 'react';
import { Sidebar, Button } from 'liquidUi';
const [visible, setVisible] = React.useState(false);
export default () => (
  <>
    <Sidebar
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
    />
    <Button
      onClick={() => {
        setVisible(true);
      }}
    >
      click
    </Button>
  </>
);
```
