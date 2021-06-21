## Message

demo

```tsx
import React from 'react';
import { Message, Button } from 'liquidUi';

const App = () => {
  return (
    <>
      <Button
        onClick={() => {
          Message.info('Info Message');
        }}
      >
        Info
      </Button>
      <br />
      <br />
      <Button
        onClick={() => {
          Message.warning('warning Message');
        }}
      >
        Warning
      </Button>
      <br />
      <br />
      <Button
        onClick={() => {
          Message.success('Success Message');
        }}
      >
        Success
      </Button>
      <br />
      <br />
      <Button
        onClick={() => {
          Message.error('Error Message');
        }}
      >
        Error
      </Button>
    </>
  );
};
export default App;
```
