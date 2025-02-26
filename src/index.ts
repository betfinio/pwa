import { init } from '@module-federation/enhanced/runtime';

init({
  name: 'betfin_pwa',
  remotes: [
    {
      name: 'betfinio_context',
      entry: 'http://localhost:9999/mf-manifest.json',
    },
    {
      name: 'betfinio_staking',
      entry: 'http://localhost:3000/mf-manifest.json',
    },
  ],
});


import('./bootstrap')