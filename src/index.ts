import * as Components from '@betfinio/components';
import { init } from '@module-federation/enhanced/runtime';
import * as PrivyReact from '@privy-io/react-auth';
import * as PrivyWagmi from '@privy-io/wagmi';
import * as ReactQuery from '@tanstack/react-query';
import * as ReactRouter from '@tanstack/react-router';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactI18Next from 'react-i18next';
import * as Wagmi from 'wagmi';

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
			lib: () => ReactQuery,
			shareConfig: {
				singleton: true,
				requiredVersion: '5.66.10',
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
			lib: () => Wagmi,
			shareConfig: {
				singleton: true,
				requiredVersion: '2.14.16',
			},
		},
		'@privy-io/wagmi': {
			version: '1.0.3',
			scope: 'default',
			lib: () => PrivyWagmi,
			shareConfig: {
				singleton: true,
				requiredVersion: '1.0.3',
			},
		},
		'@privy-io/react-auth': {
			version: '2.9.1',
			scope: 'default',
			lib: () => PrivyReact,
			shareConfig: {
				singleton: true,
				requiredVersion: '2.8.3',
			},
		},
		'@betfinio/components': {
			version: '2.2.1',
			scope: 'default',
			shareConfig: {
				singleton: true,
				requiredVersion: '2.2.1',
			},
		},
	},
});

if ('serviceWorker' in navigator) {
	console.log('sw: registering');
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(() => {
			console.log('sw: registered');
		})
		.catch((err) => {
			console.error('sw: registration failed:', err);
		});
}

window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	console.log('beforeinstallprompt', e);
	(window as any).deferredPrompt = e;
});

document.addEventListener('DOMContentLoaded', (event) => {
	// we can move only if we are not in a browser's tab
	const isBrowser = matchMedia('(display-mode: browser)').matches;
	if (!isBrowser) {
		// window.moveTo(0, 0);
		window.resizeTo(420, 920);
	}
});
import('./bootstrap');
