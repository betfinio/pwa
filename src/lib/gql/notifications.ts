import { GetNotificationsDocument, type GetNotificationsQuery, execute } from '@/.graphclient';
import type { ExecutionResult } from 'graphql/execution';
import type { Address } from 'viem';

import logger from '@/src/config/logger';
import type { Notification } from '@/src/types/notifications';

export const fetchActiveNotifications = async (address: Address, from: number): Promise<Notification[]> => {
	logger.log('fetchActiveNotifications', address, from);
	const result: ExecutionResult<GetNotificationsQuery> = await execute(GetNotificationsDocument, {
		addresses: [address],
		lastUpdated: 0,
	});

	if (result.data) {
		return result.data.notifications.map((notification) => ({
			id: notification.id,
			type: notification.type,
			data: notification.data,
			createdAt: Number(notification.createdAt),
			transactionHash: notification.transactionHash as Address,
			address: notification.address as Address,
		}));
	}
	return [];
};
