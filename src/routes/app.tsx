import Loading from '../components/pages/Loading';
import { mfQueryClient } from '../config/query';
import { useLoadRemoteModule } from '../lib/query/mf';
import type { AppModule, RemoteModule } from '../types';

const MODULE: RemoteModule = 'betfinio_app';

function Home() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const app = useLoadRemoteModule<AppModule>(mfQueryClient, MODULE, 'app');

	if (!app) return <Loading />;

	const Component = app.default;

	return <Component />;
}

export default Home;
