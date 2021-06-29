## AutoComplete

> An AutoComplete Component, which displays suggestions while typing.

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
      // value={inputValue}
      fetchSuggestions={defaultSearch}
      // onchange={(data: string) => {
      //   setInput(data);
      // }}
    />
  );
};
```

### Async Suggestion

```tsx
import React from 'react';
import { AutoComplete } from 'liquidUi';

const handleSearch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      const formateItems = items
        .slice(0, 5)
        .map((item: any) => ({ value: item.login, ...item }));
      return formateItems;
    });
};

export default () => {
  return <AutoComplete fetchSuggestions={handleSearch} />;
};
```
