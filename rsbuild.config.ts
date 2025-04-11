import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 4444,
	},
	html: {
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
