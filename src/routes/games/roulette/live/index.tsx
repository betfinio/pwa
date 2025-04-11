import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { RouletteLiveIndexModule } from '@/src/types';

const MODULE = 'betfinio_roulette';

const LiveRoulette = () => {
	const data = useLoadRemoteModule<RouletteLiveIndexModule>(mfQueryClient, MODULE, 'route/live/index');

	if (!data) return null;
	const Component = data.IndexLiveRoulette;
	return <Component />;
};

export default LiveRoulette;
