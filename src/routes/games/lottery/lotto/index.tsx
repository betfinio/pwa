import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, LotteryModule, RemoteModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_lottery';

function LotteryIndex() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'styles');
	const lottery = useLoadRemoteModule<LotteryModule>(mfQueryClient, MODULE, 'routes/index');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');
	if (!lottery || !instance) return null;

	const Component = lottery.LotteryPage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default LotteryIndex;
