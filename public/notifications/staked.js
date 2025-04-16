importScripts('./notifications/utils.js');

function getStakedTitle(notification) {
	return 'Staked';
}

function getStakedBody(notification, type) {
	const data = JSON.parse(notification.data);
	const amount = parseGwei(data.amount);
	if (type === 'conservative') {
		return `Staked ${amount} BET in conservative staking`;
	}
	if (type === 'dynamic') {
		return `Staked ${amount} BET in dynamic staking`;
	}
	return `Staked ${amount} BET`;
}
