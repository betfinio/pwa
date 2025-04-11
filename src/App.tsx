import { SonnerToaster } from '@betfinio/components';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { privyConfig } from './config/privy';
import { mfQueryClient } from './config/query';
import { PRIVY_APP_ID } from './globals';
import instance from './i18n';
import { useLoadRemoteModule } from './lib/query/mf';
import router from './router';
import type { ContextConfigModule, ContextContextModule, ContextTranslationsModule, RemoteModule } from './types';

const CONTEXT_MODULE: RemoteModule = 'betfinio_context';

function App() {
	// Load remote modules from betfinio_context
	useLoadRemoteModule(mfQueryClient, CONTEXT_MODULE, 'style');

	const config = useLoadRemoteModule<ContextConfigModule>(mfQueryClient, CONTEXT_MODULE, 'config');

	const contextModule = useLoadRemoteModule<ContextContextModule>(mfQueryClient, CONTEXT_MODULE, 'lib/context');

	const sharedTranslations = useLoadRemoteModule<ContextTranslationsModule>(mfQueryClient, CONTEXT_MODULE, 'translations');

	useEffect(() => {
		if (sharedTranslations) {
			for (const key in sharedTranslations.sharedLang) {
				instance.addResourceBundle(key, 'shared', sharedTranslations.sharedLang[key]);
			}
		}
	}, [sharedTranslations, instance]);

	// Return null while modules are loading
	if (!config || !contextModule || !sharedTranslations) {
		return null;
	}

	const { GlobalContextProvider } = contextModule;

	return (
		<I18nextProvider i18n={instance}>
			<GlobalContextProvider>
				<PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
					<QueryClientProvider client={config.queryClient}>
						<WagmiProvider config={config.wagmiConfig}>
							<RouterProvider router={router} />
							<SonnerToaster />
						</WagmiProvider>
					</QueryClientProvider>
				</PrivyProvider>
			</GlobalContextProvider>
		</I18nextProvider>
	);
}

export default App;
