import { useInfiniteQuery } from '@tanstack/react-query';
import { getInstruments } from './getInstruments';
import type { GetInstrumentsOptions } from './getInstruments';

export const useInstruments = (options: Omit<GetInstrumentsOptions, 'cursor'> = {}) => {
  return useInfiniteQuery({
    queryKey: ['instruments', options],
    queryFn: ({ pageParam }) => getInstruments({ ...options, cursor: pageParam as string | null }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.meta.next_cursor,
  });
};
