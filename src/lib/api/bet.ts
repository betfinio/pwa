import logger from '@/src/config/logger';
import type { BetInterface } from '@/src/types/bet';
import { BetInterfaceABI } from '@betfinio/abi';
import { readContract } from '@wagmi/core';
import type { Address } from 'viem';
import type { Config } from 'wagmi';

export const getBetInfo = async (bet: Address, config?: Config): Promise<BetInterface | null> => {
	if (!config) {
		logger.error('Config not found');
		return null;
	}
	const betInfo = await readContract(config, {
		abi: BetInterfaceABI,
		address: bet,
		functionName: 'getBetInfo',
		args: [],
	});
	return {
		address: bet,
		player: betInfo[0],
		game: betInfo[1],
		amount: betInfo[2],
		result: betInfo[3],
		status: betInfo[4],
		created: betInfo[5],
	} as BetInterface;
};
