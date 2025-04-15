const wallets = [];
let interval = null;
let url = null;
let lastNotification = 0;

self.addEventListener('activate', async (event) => {
	clients.claim();
	console.log('sw: activating');
	event.waitUntil(subscribe(event));
});

async function subscribe(event) {
	console.log('sw: activated');
	if (interval) {
		console.log('SW: clearing interval');
		clearInterval(interval);
	}
	console.log('sw: setting interval');
	interval = setInterval(() => {
		fetchNotifications(event);
	}, 5000);

	return Promise.resolve();
}

async function fetchNotifications(event) {
	console.log('sw: ping', wallets.length);
	console.log('sw: url', url);

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

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables: {
				addresses: wallets.map((addr) => addr.toLowerCase()),
				lastNotification: lastNotification.toString(),
			},
		}),
	});
	const data = await response.json();
	console.log('sw: data', data);
	if (data.data.notifications.length === 0) {
		console.log('sw: no notifications');
		return;
	}
	lastNotification = data.data.notifications.sort((a, b) => b.createdAt - a.createdAt)[0].createdAt;
	console.log('sw: lastNotification', lastNotification);
	for (const notification of data.data.notifications) {
		const options = {
			body: notification.data,
			icon: '/icon-512.png',
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
			},
			actions: [
				{
					action: 'confirm',
					title: 'hehe',
				},
				{
					action: 'close',
					title: 'Lol, bro',
				},
			],
		};
		self.registration.showNotification('TEST', options).then(console.log);
	}
}

// get event from app about wallets
self.addEventListener('message', (event) => {
	if (event.data.type === 'SET_WALLETS') {
		console.log('sw: setting wallets', event.data.wallets.length);
		// clear wallets
		wallets.length = 0;
		wallets.push(...event.data.wallets);
		subscribe(event);
	}
	if (event.data.type === 'SET_URL') {
		url = event.data.url;
		console.log('sw: setting url', url);
	}
});
