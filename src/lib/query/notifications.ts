import type { Notification } from '@/src/types/notifications';
import { ZeroAddress } from '@betfinio/abi';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { fetchActiveNotifications } from '../gql/notifications';
import { useLastNotification } from './idb';

export const useActiveNotifications = () => {
	const { address = ZeroAddress } = useAccount();
	const { data: lastNotification = 0, isFetched } = useLastNotification();

	return useQuery<Notification[]>({
		queryKey: ['activeNotifications', address, lastNotification],
		queryFn: () => fetchActiveNotifications(address, lastNotification),
		enabled: isFetched && address !== ZeroAddress,
		refetchInterval: 60 * 1000,
	});
};
