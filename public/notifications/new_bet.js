importScripts('./notifications/utils.js');

function getNewBetTitle(notification) {
	return 'Bet placed';
}

function getNewBetBody(notification) {
	const data = JSON.parse(notification.data);
	return 'Bet successfully placed';
}
