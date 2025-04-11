import { init } from '@module-federation/enhanced/runtime';
import * as ReactRouter from '@tanstack/react-router';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactI18Next from 'react-i18next';

init({
  name: 'betfin_pwa',
  remotes: [],
  shareStrategy: 'loaded-first',
  shared: {
    react: {
      version: '19.1.0',
      scope: 'default',
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: '19.1.0',
      },
    },
    'react-dom': {
      version: '19.1.0',
      scope: 'default',
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: '19.1.0',
      },
    },
    i18next: {
      version: '24.2.3',
      scope: 'default',
      lib: () => i18next,
      shareConfig: {
        singleton: true,
        requiredVersion: '24.2.3',
      },
    },
    'react-i18next': {
      version: '15.4.1',
      scope: 'default',
      lib: () => ReactI18Next,
      shareConfig: {
        singleton: true,
        requiredVersion: '15.4.1',
      },
    },
    '@tanstack/react-query': {
      version: '5.66.10',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '5.66.9',
      },
    },
    '@tanstack/react-router': {
      version: '1.115.2',
      scope: 'default',
      lib: () => ReactRouter,
      shareConfig: {
        singleton: true,
        requiredVersion: '1.115.2',
      },
    },
    wagmi: {
      version: '2.14.16',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '2.14.16',
      },
    },
    '@privy-io/wagmi': {
      version: '1.0.3',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '1.0.3',
      },
    },
    '@privy-io/react-auth': {
      version: '2.8.3',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '2.8.3',
      },
    },
    '@betfinio/components': {
      version: '2.1.4',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '2.1.4',
      },
    },
  },
});

import('./bootstrap');
