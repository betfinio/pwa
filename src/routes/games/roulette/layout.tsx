import { mfQueryClient } from '@/src/config/query';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { I18nModule, RemoteModule } from '@/src/types';
import { Outlet } from '@tanstack/react-router';
import { I18nextProvider } from 'react-i18next';

const MODULE: RemoteModule = 'betfinio_roulette';
function RouletteLayout() {
  useLoadRemoteModule(mfQueryClient, MODULE, 'style');
  const instance = useLoadRemoteModule<I18nModule>(
    mfQueryClient,
    MODULE,
    'i18n',
  );
  if (!instance) return null;
  return (
    <I18nextProvider i18n={instance.default}>
      <Outlet />
    </I18nextProvider>
  );
}

export default RouletteLayout;
