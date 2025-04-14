import Loading from '@/src/components/pages/Loading';
import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule, RouletteSingleModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_roulette';

function SingleRoulette() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const roulette = useLoadRemoteModule<RouletteSingleModule>(mfQueryClient, MODULE, 'route/single');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');

	if (!roulette || !instance) return <Loading />;

	const Component = roulette.RoulettePage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default SingleRoulette;
