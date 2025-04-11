import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule, StonesModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_stones';

function StonesIndex() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const stones = useLoadRemoteModule<StonesModule>(mfQueryClient, MODULE, 'route');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');

	if (!stones || !instance) return null;

	const Component = stones.default;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default StonesIndex;
