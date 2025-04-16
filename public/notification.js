/**
 * @param {{data: {transactionHash: string, createdAt: number, transactionHash: string, type: "TRANSFER"|"PASS", data: string, address: string}}} notification
 * @returns {Promise<{title: string, options?: {actions?: {action: string, title: string, icon?:string}[], badge?: string, body?: string, data?: string, icon: string,}}}>}
 */
async function parseNotification(notification) {
	const data = notification.data;
	console.log('sw: notification', notification);
	return {
		title: getTitle(notification),
		options: {
			body: getBody(notification),
			actions: [{ action: 'view', title: 'View' }],
		},
	};
}

function getTitle(notification) {
	if (notification.type === 'TRANSFER') {
		const recipient = notification.address.toLowerCase();
		const body = JSON.parse(notification.data);
		if (recipient === body.from.toLowerCase()) {
			return 'Outgoing Transfer';
		}
		return 'Incoming Transfer';
	}
	if (notification.type === 'PASS') {
		return 'Welcome to Betfin!';
	}
	return 'Unknown';
}

function getBody(notification) {
	if (notification.type === 'TRANSFER') {
		const recipient = notification.address;
		const body = JSON.parse(notification.data);
		if (recipient === body.from.toLowerCase()) {
			return `You sent ${parseGwei(body.amount)} BET to ${truncateAddress(body.to)}`;
		}
		return `You received ${parseGwei(body.amount)} BET from ${truncateAddress(body.from)}`;
	}
	return 'Unknown';
}

function parseGwei(value) {
	return (Number(value) / 10 ** 18).toFixed(2);
}

function truncateAddress(address) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
