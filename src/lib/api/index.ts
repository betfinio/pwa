import logger from '@/src/config/logger';

export const getProviders = async () => {
	logger.info('fetching local providers');
	try {
		const urlLocal = '/providers-local.json';
		const dataLocal = await fetch(urlLocal);
		logger.info('fetched local providers');
		return await dataLocal.json();
	} catch (error) {
		logger.error('error fetching local providers', error);
		const url = import.meta.env.PUBLIC_PROVIDERS_URL;
		logger.info('fetching remote providers');
		const data = await fetch(url);
		logger.info('fetched remote providers');
		return data.json();
	}
};
