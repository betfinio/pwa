import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { AcademyModule, I18nModule, RemoteModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_academy';

function LessonSectionLessonPage() {
	useLoadRemoteModule(mfQueryClient, MODULE, 'style');
	const academy = useLoadRemoteModule<AcademyModule>(mfQueryClient, MODULE, 'route/section/lesson');

	const instance = useLoadRemoteModule<I18nModule>(mfQueryClient, MODULE, 'i18n');

	if (!academy || !instance) return null;

	const Component = academy.LessonPage;

	return (
		<I18nextProvider i18n={instance.default}>
			<Component />
		</I18nextProvider>
	);
}

export default LessonSectionLessonPage;
