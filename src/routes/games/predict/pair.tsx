import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule, PredictModule } from '@/src/types';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_predict';

function PredictPair() {
  useLoadRemoteModule(mfQueryClient, MODULE, 'style');
  const predict = useLoadRemoteModule<PredictModule>(
    mfQueryClient,
    MODULE,
    'route',
  );

  const instance = useLoadRemoteModule<I18nModule>(
    mfQueryClient,
    MODULE,
    'i18n',
  );

  if (!predict || !instance) return null;

  const Component = predict.PredictPage;

  return (
    <I18nextProvider i18n={instance.default}>
      <Component />
    </I18nextProvider>
  );
}

export default PredictPair;
