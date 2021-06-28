## AutoComplete

### Sync Suggestion

```tsx
import React from 'react';
import { AutoComplete } from 'liquidUi';

const defaultSearch = (query: string) => {
  const result = new Array(3);
  for (let i = 0; i < result.length; i++) {
    result[i] = {
      value: query.repeat(i + 1),
    };
  }

  return result;
};

export default () => {
  const [inputValue, setInput] = React.useState('');
  return (
    <AutoComplete
      value={inputValue}
      fetchSuggestions={defaultSearch}
      onchange={(data: string) => {
        setInput(data);
      }}
    />
  );
};
```
