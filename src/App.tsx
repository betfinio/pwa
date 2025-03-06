import { RouterProvider } from '@tanstack/react-router';
import router from './router';
import { mfQueryClient } from './config/query';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider } from '@privy-io/react-auth';
import { PRIVY_APP_ID } from './globals';
import { privyConfig } from './config/privy';
import { I18nextProvider } from 'react-i18next';
import instance from './i18n';
import type {
  ContextConfigModule,
  ContextContextModule,
  RemoteModule,
} from './types';
import { useLoadRemoteModule } from './lib/query/mf';

const MODULE: RemoteModule = 'betfinio_context';

function App() {
  useLoadRemoteModule(mfQueryClient, MODULE, 'style');
  const config = useLoadRemoteModule<ContextConfigModule>(
    mfQueryClient,
    MODULE,
    'config',
  );
  const data = useLoadRemoteModule<ContextContextModule>(
    mfQueryClient,
    MODULE,
    'lib/context',
  );

  if (!config || !data) {
    return null;
  }

  const GlobalContextProvider = data.GlobalContextProvider;
  console.log('rendering app');
  return (
    <I18nextProvider i18n={instance}>
      <GlobalContextProvider>
        <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
          <QueryClientProvider client={config.queryClient}>
            <WagmiProvider config={config.wagmiConfig}>
              <RouterProvider router={router} />
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </GlobalContextProvider>
    </I18nextProvider>
  );
}

export default App;
