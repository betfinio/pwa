import type { Notification } from '@/src/types/notifications';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import PassNotification from '../components/notifications/PassNotification';
import TransferNotification from '../components/notifications/TransferNotification';
import { useActiveNotifications } from '../lib/query/notifications';

function Notifications() {
	const { data: notifications } = useActiveNotifications();

	const groupedNotifications = useMemo(() => {
		if (!notifications) return {};

		return notifications.reduce(
			(groups, notification) => {
				// Convert timestamp to date string
				const date = new Date(Number(notification.createdAt) * 1000);
				const dateStr = format(date, 'yyyy-MM-dd');

				if (!groups[dateStr]) {
					groups[dateStr] = [];
				}

				groups[dateStr].push(notification);
				return groups;
			},
			{} as Record<string, Notification[]>,
		);
	}, [notifications]);

	return (
		<div className="flex flex-col gap-2 p-2">
			<AnimatePresence mode="popLayout">
				{Object.entries(groupedNotifications).map(([date, dayNotifications]) => (
					<motion.div
						key={date}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}
						className="flex flex-col gap-2"
					>
						<h3 className="text-sm font-medium text-gray-500">{format(new Date(date), 'MMMM d, yyyy')}</h3>
						<div className="flex flex-col gap-2">
							<AnimatePresence mode="popLayout">
								{dayNotifications.map((notification) => (
									<motion.div
										key={notification.id}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.15 }}
									>
										<SingleNotification notification={notification} />
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

function SingleNotification({ notification }: { notification: Notification }) {
	if (notification.type === 'TRANSFER') {
		return <TransferNotification notification={notification} />;
	}
	if (notification.type === 'PASS') {
		return <PassNotification />;
	}
	return null;
}

export default Notifications;
