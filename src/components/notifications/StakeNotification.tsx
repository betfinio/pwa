import type { Notification } from '@/src/types/notifications';
import { BetValue } from '@betfinio/components';
import { Bank, MoneyHand } from '@betfinio/components/icons';
import { useMemo } from 'react';
import BaseNotification from './BaseNotification';

function StakeNotification({ notification, variant }: { notification: Notification; variant: 'conservative' | 'dynamic' }) {
	const data = JSON.parse(notification.data);
	const amount = BigInt(data.amount);

	const title = useMemo(() => {
		return 'Staked';
	}, [notification]);

	const description = useMemo(() => {
		return `Staked in ${variant} staking`;
	}, [notification]);

	const icon = useMemo(() => {
		if (variant === 'conservative') {
			return <Bank className="size-8 p-1 text-primary" />;
		}
		return <MoneyHand className="size-8 p-1 text-primary" />;
	}, [notification]);

	return (
		<BaseNotification
			icon={icon}
			title={title}
			description={description}
			value={<BetValue value={amount} withIcon iconClassName="size-3" className="text-sm" />}
		/>
	);
}

export default StakeNotification;
