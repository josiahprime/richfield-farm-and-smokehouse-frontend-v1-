"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  initialItems?: number;
  loadCount?: number;
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  initialItems = 4,
  loadCount = 4,
}: InfiniteScrollProps<T>) {
  const [visible, setVisible] = useState(initialItems);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => setVisible((v) => v + loadCount), [loadCount]);

  useEffect(() => {
  if (!loaderRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    { rootMargin: "100px" }
  );

  observer.observe(loaderRef.current);

  return () => {
    if (loaderRef.current) observer.unobserve(loaderRef.current);
    // always return void
  };
}, [loadMore]);


  useEffect(() => {
    setVisible(initialItems); // Reset if items change
  }, [items, initialItems]);

  return (
    <>
      {items.slice(0, visible).map(renderItem)}
      {visible < items.length && (
        <div ref={loaderRef} className="text-center py-6">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      )}
    </>
  );
}
