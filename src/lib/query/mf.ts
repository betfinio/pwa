import type { Manifest, RemoteModule } from '@/src/types';
import { type QueryClient, useQuery } from '@tanstack/react-query';
import { getManifest, loadRemoteModule } from '../api/mf';

// Generic hook for loading remote modules
export const useLoadRemoteModule = <T>(
  client: QueryClient,
  moduleType: RemoteModule,
  path: string,
) => {
  const manifest = useContextManifest(client);

  const query = useQuery<T>(
    {
      queryKey: [moduleType, manifest.data, path],
      queryFn: () => loadRemoteModule(moduleType, path),
    },
    client,
  );

  return query.data;
};

// Specific module hooks
export const useContextManifest = (client: QueryClient) => {
  return useQuery<Manifest | null>(
    {
      queryKey: ['contextManifest'],
      queryFn: () => getManifest(),
    },
    client,
  );
};
