import type { Notification } from '@/src/types/notifications';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import NewBetNotification from '../components/notifications/NewBetNotification';
import PassNotification from '../components/notifications/PassNotification';
import StakeNotification from '../components/notifications/StakeNotification';
import TransferNotification from '../components/notifications/TransferNotification';
import { useActiveNotifications } from '../lib/query/notifications';
import { getNotificationPermission, requestNotificationPermission } from '../lib/shared/notifications';

function Notifications() {
	const { data: notifications } = useActiveNotifications();

	// State to track notification permission
	const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);

	// Check notification permission on component mount
	useEffect(() => {
		setNotificationPermission(getNotificationPermission());
	}, []);

	// Function to request notification permission
	const handleRequestPermission = async () => {
		const permission = await requestNotificationPermission();
		setNotificationPermission(permission);
	};

	const groupedNotifications = useMemo(() => {
		if (!notifications) return {};

		// First, group notifications by transactionHash
		const transactionGroups = notifications.reduce(
			(acc, notification) => {
				if (!acc[notification.transactionHash]) {
					acc[notification.transactionHash] = [];
				}
				acc[notification.transactionHash].push(notification);
				return acc;
			},
			{} as Record<string, Notification[]>,
		);

		// Process each transaction group to combine related notifications
		const processedNotifications = Object.values(transactionGroups).map((group) => {
			const stakeNotification = group.find((n) => n.type === 'CONSERVATIVE_STAKE' || n.type === 'DYNAMIC_STAKE');
			const transferNotification = group.find((n) => n.type === 'TRANSFER');

			// If we have both stake and transfer, combine them
			if (stakeNotification && transferNotification) {
				const transferData = JSON.parse(transferNotification.data);
				const combinedNotification = {
					...stakeNotification,
					data: JSON.stringify({
						...JSON.parse(stakeNotification.data),
						amount: transferData.amount,
					}),
				};
				return combinedNotification;
			}

			// If it's just a single notification, return the first one from the group
			return group[0];
		});

		// Group by date as before
		return processedNotifications.reduce(
			(groups, notification) => {
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

	if (!notifications || notifications.length === 0) {
		return (
			<div className="flex flex-col gap-4 p-4 w-full justify-center items-center">
				<div className="text-muted-foreground">No notifications</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 p-2">
			{notificationPermission && notificationPermission !== 'granted' && (
				<div className="text-sm text-muted-foreground p-2 border w-full border-destructive rounded-lg">
					<div className="flex flex-row justify-between gap-2 items-center">
						{notificationPermission === 'denied'
							? 'Notifications are blocked. Please enable them in your browser settings.'
							: 'Enable notifications to stay updated'}
						{notificationPermission === 'default' && (
							<button type="button" onClick={handleRequestPermission} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
								Enable Notifications
							</button>
						)}
					</div>
				</div>
			)}
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
	if (notification.type === 'NEW_BET') {
		return <NewBetNotification notification={notification} />;
	}
	if (notification.type === 'PASS') {
		return <PassNotification />;
	}
	if (notification.type === 'CONSERVATIVE_STAKE') {
		return <StakeNotification notification={notification} variant="conservative" />;
	}
	if (notification.type === 'DYNAMIC_STAKE') {
		return <StakeNotification notification={notification} variant="dynamic" />;
	}
	if (notification.type === 'TRANSFER') {
		return <TransferNotification notification={notification} />;
	}
	return null;
}

export default Notifications;
