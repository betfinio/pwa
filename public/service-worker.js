const DB_NAME = 'betfinio-notifications';
const STORE_NAME = 'settings';
const DB_VERSION = 2;
const POLL_INTERVAL = 5000;

let interval = null;
const wallets = [];

// IndexedDB Operations
async function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: 'id' });
			}
		};
	});
}

async function getFromDB(key) {
	const db = await openDB();
	return new Promise((resolve) => {
		const transaction = db.transaction(STORE_NAME, 'readonly');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.get(key);

		request.onsuccess = () => {
			resolve(request.result?.value);
		};
	});
}

async function saveToDB(key, value) {
	const db = await openDB();
	const transaction = db.transaction(STORE_NAME, 'readwrite');
	const store = transaction.objectStore(STORE_NAME);
	await store.put({ id: key, value });
}

// Notification Operations
async function showNotification(notification) {
	const options = {
		body: notification.data,
		icon: '/icon-512.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			transactionHash: notification.transactionHash,
		},
		actions: [
			{ action: 'confirm', title: 'View' },
			{ action: 'close', title: 'Dismiss' },
		],
	};
	await self.registration.showNotification('New Transaction', options);
}

async function fetchNotifications() {
	const url = await getFromDB('apiUrl');
	const lastNotification = (await getFromDB('lastNotification')) || '0';

	if (!url || wallets.length === 0) {
		console.log('sw: missing url or wallets');
		return;
	}

	const query = `
    query($addresses: [Bytes!]!, $lastNotification: BigInt!) {
      notifications(where: { address_in: $addresses, createdAt_gt: $lastNotification }) {
        id
        address
        transactionHash
        createdAt
        data
      }
    }
  `;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query,
				variables: {
					addresses: wallets.map((addr) => addr.toLowerCase()),
					lastNotification: lastNotification.toString(),
				},
			}),
		});

		const { data } = await response.json();

		console.log('sw: notifications', data.notifications.length);
		if (!data?.notifications?.length) {
			return;
		}

		const newLastNotification = data.notifications.reduce((max, n) => Math.max(max, n.createdAt), 0);

		await saveToDB('lastNotification', newLastNotification);
		await Promise.all(data.notifications.map(showNotification));
	} catch (error) {
		console.error('sw: fetch error:', error);
	}
}

// Service Worker Event Handlers
async function startPolling() {
	if (interval) {
		clearInterval(interval);
	}

	interval = setInterval(fetchNotifications, POLL_INTERVAL);
	await fetchNotifications(); // Initial fetch
}

self.addEventListener('activate', (event) => {
	clients.claim();
	console.log('sw: activating');
	event.waitUntil(startPolling());
});

self.addEventListener('message', async (event) => {
	const { type, wallets: newWallets, url: newUrl } = event.data;

	if (type === 'SET_WALLETS' && Array.isArray(newWallets)) {
		console.log('sw: setting wallets', newWallets.length);
		wallets.length = 0;
		wallets.push(...newWallets);
		await startPolling();
	}

	if (type === 'SET_URL' && newUrl) {
		console.log('sw: setting url', newUrl);
		await saveToDB('apiUrl', newUrl);
		await startPolling();
	}
});
