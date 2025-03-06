import { type QueryClient, useQuery } from "@tanstack/react-query"
import { getProviders } from "../api"
import type { BetfinProvider } from "@/src/types"

export const useProviders = (queryClient: QueryClient) => {
  return useQuery<BetfinProvider[]>({
    queryKey: ['providers'],
    queryFn: () => getProviders(),
  }, queryClient)
} 