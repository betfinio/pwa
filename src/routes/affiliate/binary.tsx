import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { AffiliateModule, I18nModule, RemoteModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_affiliate';

function BinaryTree() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const affiliate = useLoadRemoteModule<AffiliateModule>(mfQueryClient, MODULE, 'route/binary');
	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');
	if (!affiliate || !instance) return null;

	const Component = affiliate.BinaryTreePage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default BinaryTree;
