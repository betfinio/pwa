import type { BetfinProvider } from '@/src/types';
import { type QueryClient, useQuery } from '@tanstack/react-query';
import { getProviders } from '../api';

export const useProviders = (queryClient: QueryClient) => {
  return useQuery<BetfinProvider[]>(
    {
      queryKey: ['providers'],
      queryFn: () => getProviders(),
    },
    queryClient,
  );
};
