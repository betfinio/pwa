import Loading from '@/src/components/pages/Loading';
import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule, StatisticsModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_statistics';

function StatisticsPage() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const statistics = useLoadRemoteModule<StatisticsModule>(mfQueryClient, MODULE, 'route');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');

	if (!statistics || !instance) return <Loading />;

	const Component = statistics.StatisticsPage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default StatisticsPage;
