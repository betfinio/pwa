import type { Notification } from '@/src/types/notifications';
import { truncateEthAddress } from '@betfinio/abi';
import { BetValue } from '@betfinio/components';
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from 'lucide-react';
import { useMemo } from 'react';
import BaseNotification from './BaseNotification';

function TransferNotification({ notification }: { notification: Notification }) {
	const address = notification.address.toLowerCase();
	const data = JSON.parse(notification.data);
	const from = data.from.toLowerCase();
	const to = data.to.toLowerCase();
	const amount = BigInt(data.amount);

	const title = useMemo(() => {
		if (address === from) {
			return 'Sent';
		}
		return 'Received';
	}, [notification]);

	const description = useMemo(() => {
		if (address === from) {
			return `to ${truncateEthAddress(to)}`;
		}
		return `from ${truncateEthAddress(from)}`;
	}, [notification]);

	const icon = useMemo(() => {
		if (address === from) {
			return <ArrowUpCircleIcon className="size-8 p-1 text-destructive" />;
		}
		return <ArrowDownCircleIcon className="size-8 p-1 text-success" />;
	}, [notification]);

	return (
		<BaseNotification
			icon={icon}
			title={title}
			description={description}
			value={
				<div className="flex flex-row items-center text-sm">
					{address === to ? '+' : '-'}
					<BetValue value={amount} withIcon iconClassName="size-3" className="text-sm" />
				</div>
			}
		/>
	);
}

export default TransferNotification;
