## Progress

```tsx
import React from 'react';
import { Progress } from 'liquidUi';

export default () => {
  return(
    <div style={{width: "320px"}}>
      <Progress percent={80} />
      <Progress percent={60} theme="success" styles={{marginTop: "20px"}}/>
      <Progress percent={40}  theme="danger" styles={{marginTop: "20px"}}/>
    </div>
  )

}
```