importScripts('./notifications/transfer.js');
importScripts('./notifications/pass.js');
importScripts('./notifications/staked.js');
importScripts('./notifications/new_bet.js');
/**
 * @param {{data: {transactionHash: string, createdAt: number, transactionHash: string, type: "TRANSFER"|"PASS"|"CONSERVATIVE_STAKE"|"DYNAMIC_STAKE", data: string, address: string}}} notification
 * @returns {Promise<{title: string, options?: {actions?: {action: string, title: string, icon?:string}[], badge?: string, body?: string, data?: string, icon: string,}}}>}
 */
async function parseNotification(notification) {
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
		return getTransferTitle(notification);
	}
	if (notification.type === 'PASS') {
		return getPassTitle(notification);
	}
	if (notification.type === 'CONSERVATIVE_STAKE') {
		return getStakedTitle(notification);
	}
	if (notification.type === 'DYNAMIC_STAKE') {
		return getStakedTitle(notification);
	}
	if (notification.type === 'NEW_BET') {
		return getNewBetTitle(notification);
	}
	return 'Unknown';
}

function getBody(notification) {
	if (notification.type === 'TRANSFER') {
		return getTransferBody(notification);
	}
	if (notification.type === 'PASS') {
		return getPassBody(notification);
	}
	if (notification.type === 'CONSERVATIVE_STAKE') {
		return getStakedBody(notification, 'conservative');
	}
	if (notification.type === 'DYNAMIC_STAKE') {
		return getStakedBody(notification, 'dynamic');
	}
	if (notification.type === 'NEW_BET') {
		return getNewBetBody(notification);
	}
	return 'Unknown';
}
