import Loading from '@/src/components/pages/Loading';
import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule, StakingConservativeModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_staking';

function ConservativeStaking() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const staking = useLoadRemoteModule<StakingConservativeModule>(mfQueryClient, MODULE, 'conservative');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');

	if (!staking || !instance) return <Loading />;

	const Component = staking.ConservativeStakingPage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default ConservativeStaking;
