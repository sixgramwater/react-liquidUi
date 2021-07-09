import React, { useState } from 'react';
import InfiniteScroll from './scroll';

const NUMBERS_PER_PAGE = 10;

const App = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const hasMoreData = numbers.length < 100;
  const loadMoreNumbers = () => {
    setPage((page) => page + 1);
    setLoading(true);
    setTimeout(() => {
      const newNumbers = new Array(NUMBERS_PER_PAGE)
        .fill(1)
        .map((_, i) => page * NUMBERS_PER_PAGE + i);
      setNumbers((nums) => [...nums, ...newNumbers]);
      setLoading(false);
    }, 300);
  };
  return (
    <InfiniteScroll
      hasMore={hasMoreData}
      isLoading={loading}
      onBottomHit={loadMoreNumbers}
    >
      <ul>
        {numbers.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default App;
