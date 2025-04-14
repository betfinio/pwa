import logger from '@/src/config/logger';
import type { ContextGlobalsModule } from '@/src/types';
import { sendTransaction, simulateContract, writeContract } from '@wagmi/core';
import { type Address, erc20Abi } from 'viem';
import type { Config } from 'wagmi';
import { loadRemoteModule } from './mf';

export const sendERC20 = async (to: Address, amount: bigint, config: Config) => {
	logger.start('sending', { to, amount });
	const globals = await loadRemoteModule<ContextGlobalsModule>('betfinio_context', 'globals');
	await simulateContract(config, {
		address: globals.TOKEN_ADDRESS,
		abi: erc20Abi,
		functionName: 'transfer',
		args: [to, amount],
	});
	const tx = await writeContract(config, {
		address: globals.TOKEN_ADDRESS,
		abi: erc20Abi,
		functionName: 'transfer',
		args: [to, amount],
	});
	logger.success('sent', { tx });
	return tx;
};

export const sendNative = async (to: Address, amount: bigint, config: Config) => {
	logger.start('sending', { to, amount });
	const tx = await sendTransaction(config, {
		to,
		value: amount,
	});
	logger.success('sent', { tx });
	return tx;
};
