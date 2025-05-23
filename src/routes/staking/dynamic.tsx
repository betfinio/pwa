import Loading from '@/src/components/pages/Loading';
import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule, StakingDynamicModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_staking';

function DynamicStaking() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const staking = useLoadRemoteModule<StakingDynamicModule>(mfQueryClient, MODULE, 'dynamic');
	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');
	if (!staking || !instance) return <Loading />;

	const Component = staking.DynamicStakingPage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default DynamicStaking;
