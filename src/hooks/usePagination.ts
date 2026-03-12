import { useState, useMemo } from 'react';

interface UsePaginationOptions<T> {
  items: T[];
  pageSize: number;
}

export function usePagination<T>({ items, pageSize }: UsePaginationOptions<T>) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(items.length / pageSize);

  const currentItems = useMemo(() => {
    const start = page * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const nextPage = () => setPage(p => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage(p => Math.max(p - 1, 0));
  const goToPage = (n: number) => setPage(Math.max(0, Math.min(n, totalPages - 1)));

  return { currentItems, page, totalPages, nextPage, prevPage, goToPage, hasNext: page < totalPages - 1, hasPrev: page > 0 };
}
