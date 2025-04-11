import logger from '@/src/config/logger';
import type { Manifest, RemoteModule } from '@/src/types';
import { loadRemote, loadShare, registerRemotes } from '@module-federation/enhanced/runtime';

export async function getManifest(): Promise<Manifest | null> {
	// read manifest variable from local storage
	const data = localStorage.getItem('context_manifest');
	if (!data) {
		localStorage.setItem('context_manifest', 'https://gist.githubusercontent.com/bf-monster/95bc958deef39875af3de15240ad9c38/raw/bf-manifest-dev.json');
		return await getManifest();
	}
	const result = await fetch(data);
	try {
		const manifest = await result.json();
		registerRemotes([
			{
				name: 'betfinio_context',
				entry: `${manifest.context}/mf-manifest.json`,
			},
			...Object.keys(manifest.remotes).map((key) => ({
				name: `betfinio_${key}`,
				entry: `${manifest.remotes[key]}/mf-manifest.json`,
			})),
		]);
		return manifest;
	} catch (e) {
		logger.error('error parsing manifest', e);
		return null;
	}
}

export async function loadRemoteModule<T>(module: RemoteModule, path: string) {
	const config = await loadRemote<T>(`${module}/${path}`);
	if (!config) {
		throw new Error(`Failed to load ${module} config - ${path}`);
	}
	return config as T;
}
