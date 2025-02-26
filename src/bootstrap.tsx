import ReactDOM from 'react-dom/client';
import './index.css';
import '@betfinio/components';
import 'betfinio_context/style';
import { PrivyProvider } from '@privy-io/react-auth';
import { RouterProvider } from '@tanstack/react-router';
import router from './router';
const rootEl = document.getElementById('root');
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import { queryClient } from './config/query';

import { privyConfig } from './config/privy';
import { wagmiConfig } from 'betfinio_context/config';
import { PRIVY_APP_ID } from './globals';

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <RouterProvider router={router} />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>,
  );
}
