import Loading from '@/src/components/pages/Loading';
import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { RouletteLiveTableModule } from '@/src/types';

const MODULE = 'betfinio_roulette';

const LiveRoulette = () => {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const data = useLoadRemoteModule<RouletteLiveTableModule>(mfQueryClient, MODULE, 'route/live/table');

	if (!data) return <Loading />;
	const Component = data.RouletteLiveTable;
	return <Component />;
};

export default LiveRoulette;
