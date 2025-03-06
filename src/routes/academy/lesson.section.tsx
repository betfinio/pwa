import { I18nextProvider } from 'react-i18next';

import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { AcademyModule, I18nModule, RemoteModule } from '@/src/types';

const MODULE: RemoteModule = 'betfinio_academy';

function LessonSectionPage() {
  useLoadRemoteModule(mfQueryClient, MODULE, 'style');
  const academy = useLoadRemoteModule<AcademyModule>(
    mfQueryClient,
    MODULE,
    'route/section/index',
  );

  const instance = useLoadRemoteModule<I18nModule>(
    mfQueryClient,
    MODULE,
    'i18n',
  );

  if (!academy || !instance) return null;

  const Component = academy.SectionPage;

  return (
    <I18nextProvider i18n={instance.default}>
      <Component />
    </I18nextProvider>
  );
}

export default LessonSectionPage;
