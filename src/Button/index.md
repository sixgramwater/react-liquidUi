## Button

one of the most frequently used component during development.
We offerd two different dynamic effect: common hover type and ripple type.

### primary button

```tsx
import React from 'react';
import { Button } from 'liquidUi';

export default () => (
  // <Loader show={true} hasMask={true}>
  // </Loader>
  <Button>ClickMe</Button>
);
```

### plain button

```tsx
import React from 'react';
import { Button } from 'liquidUi';

export default () => (
  // <Loader show={true} hasMask={true}>
  // </Loader>
  <Button type="plain">ClickMe</Button>
);
```

### ripple button

```tsx
import React from 'react';
import { Button } from 'liquidUi';

export default () => (
  // <Loader show={true} hasMask={true}>
  // </Loader>
  <Button ripple={true}>ClickMe</Button>
);
```
