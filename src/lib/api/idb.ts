import { type DBSchema, openDB } from 'idb';

interface BetfinioDBSchema extends DBSchema {
	settings: {
		key: string;
		value: {
			id: string;
			value: string | number;
		};
	};
}

const DB_NAME = 'betfinio-notifications';
const DB_VERSION = 2;

export const initDB = async () => {
	return openDB<BetfinioDBSchema>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('settings')) {
				db.createObjectStore('settings', { keyPath: 'id' });
			}
		},
	});
};

export async function getLastNotification(): Promise<number> {
	const db = await initDB();
	try {
		const result = await db.get('settings', 'lastNotification');
		console.log('result', result);
		return Number(result?.value) ?? 0;
	} catch (error) {
		console.error('Failed to get last notification:', error);
		return 0;
	}
}
