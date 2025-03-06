import { init } from '@module-federation/enhanced/runtime';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactI18Next from 'react-i18next';
import * as ReactRouter from '@tanstack/react-router';
init({
  name: 'betfin_pwa',
  remotes: [],
  shared: {
    'react': {
      version: '18.3.1',
      scope: 'default',
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: '18.3.1',
      },
    },
    'react-dom': {
      version: '18.3.1',
      scope: 'default',
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: '18.3.1',
      },
    },
    'i18next': {
      version: '24.2.2',
      scope: 'default',
      lib: () => i18next,
      shareConfig: {
        singleton: true,
        requiredVersion: '24.2.2',
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
      version: '5.66.9',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '5.66.9',
      },
    },
    '@tanstack/react-router': {
      version: '1.111.11',
      scope: 'default',
      lib: () => ReactRouter,
      shareConfig: {
        singleton: true,
        requiredVersion: '1.111.11',
      },
    },
    'wagmi': {
      version: '2.14.12',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '2.14.12',
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
      version: '2.4.5',
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '2.4.5',
      },
    },
  },
})


import('./bootstrap')

