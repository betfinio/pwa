import { useQuery } from '@tanstack/react-query';
import type { Address } from 'viem';
import { useConfig } from 'wagmi';
import { getBetInfo } from '../api/bet';

export const useBetInfo = (bet: Address) => {
	const config = useConfig();
	return useQuery({
		queryKey: ['betInfo', bet],
		queryFn: () => getBetInfo(bet, config),
	});
};
