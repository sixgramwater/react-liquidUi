## Menu

a simple implement of menu component

### horizontal

```tsx
import React from 'react';
import { Menu } from 'liquidUi';

const App = () => {
  return (
    <Menu defaultIndex="0">
      <Menu.Item>link</Menu.Item>
      <Menu.Item>link 2</Menu.Item>
      <Menu.Submenu title="SubMenu">
        <Menu.Item>dropdown 1</Menu.Item>
        <Menu.Item>dropdown 2</Menu.Item>
        <Menu.Item>dropdown 3</Menu.Item>
        <Menu.Item>dropdown 4</Menu.Item>
      </Menu.Submenu>
    </Menu>
  );
};

export default App;
```

### vertical

```tsx
import React from 'react';
import { Menu } from 'liquidUi';

const App = () => {
  return (
    <Menu defaultIndex="0" mode="vertical">
      <Menu.Item>link 1</Menu.Item>
      <Menu.Item>link 2</Menu.Item>
      <Menu.Item>link 3</Menu.Item>
      <Menu.Item>link 4</Menu.Item>
      <Menu.Submenu title="dropdown">
        <Menu.Item>dropdown 1</Menu.Item>
        <Menu.Item>dropdown 2</Menu.Item>
      </Menu.Submenu>
    </Menu>
  );
};

export default App;
```
