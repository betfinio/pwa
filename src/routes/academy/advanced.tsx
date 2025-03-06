import { I18nextProvider } from 'react-i18next';

import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { AcademyModule, I18nModule, RemoteModule } from '@/src/types';

const MODULE: RemoteModule = 'betfinio_academy';

function AdvancedPage() {
  useLoadRemoteModule(mfQueryClient, MODULE, 'style');
  const advanced = useLoadRemoteModule<AcademyModule>(
    mfQueryClient,
    MODULE,
    'route/advanced',
  );

  const instance = useLoadRemoteModule<I18nModule>(
    mfQueryClient,
    MODULE,
    'i18n',
  );

  if (!advanced || !instance) return null;

  const Component = advanced.AdvancedPage;

  return (
    <I18nextProvider i18n={instance.default}>
      <Component />
    </I18nextProvider>
  );
}

export default AdvancedPage;
