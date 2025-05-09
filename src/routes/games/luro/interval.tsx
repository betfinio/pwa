import Loading from '@/src/components/pages/Loading';
import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, LuroModule, RemoteModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_luro';

function LuroInterval() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const luro = useLoadRemoteModule<LuroModule>(mfQueryClient, MODULE, 'route');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');

	if (!luro || !instance) return <Loading />;

	const Component = luro.LuroPage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default LuroInterval;
