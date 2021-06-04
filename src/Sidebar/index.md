## Sidebar

Demo:

```tsx
import React from 'react';
import { Sidebar, Button } from 'liquidUi';
const [visible, setVisible] = React.useState(false);
export default () => (
  <div>
    <Sidebar
      visible={visible}
      onMaskClick={() => {
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
  </div>
);
```
