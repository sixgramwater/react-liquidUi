## Modal

Demo:

```tsx
import React from 'react';
import { Modal, Button } from 'liquidUi';
const [visible, setVisible] = React.useState(false);
const handleOk = () => {
  setVisible(false);
  console.log('click ok');
};

const handleCancel = () => {
  setVisible(false);
  console.log('click cancel');
};
export default () => (
  <div>
    <Modal
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
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
