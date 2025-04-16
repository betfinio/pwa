import { useQuery } from '@tanstack/react-query';
import { getLastNotification } from '../api/idb';

export const useLastNotification = () => {
	return useQuery<number>({
		queryKey: ['lastNotification'],
		queryFn: getLastNotification,
		staleTime: 1000 * 60,
	});
};
