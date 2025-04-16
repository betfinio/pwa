importScripts('./notifications/utils.js');

function getTransferTitle(notification) {
	const recipient = notification.address.toLowerCase();
	const body = JSON.parse(notification.data);
	if (recipient === body.from.toLowerCase()) {
		return 'Outgoing Transfer';
	}
	return 'Incoming Transfer';
}

function getTransferBody(notification) {
	const recipient = notification.address;
	const body = JSON.parse(notification.data);
	if (recipient === body.from.toLowerCase()) {
		return `You sent ${parseGwei(body.amount)} BET to ${truncateAddress(body.to)}`;
	}
	return `You received ${parseGwei(body.amount)} BET from ${truncateAddress(body.from)}`;
}
