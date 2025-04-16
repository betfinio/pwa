import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 4444,
	},
	tools: {
		rspack: {
			ignoreWarnings: [/Critical dependency: the request of a dependency is an expression/],
		},
	},
	html: {
		favicon: './public/favicon.svg',
		title: 'Betfin Wallet',
		tags: [
			{
				tag: 'link',
				attrs: {
					rel: 'manifest',
					href: 'manifest.json',
				},
				head: true,
				publicPath: true,
				hash: false,
			},
		],
	},
});
