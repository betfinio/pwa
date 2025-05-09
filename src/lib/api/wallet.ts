import logger from '@/src/config/logger';
import type { ContextGlobalsModule } from '@/src/types';
import { ZeroAddress } from '@betfinio/abi';
import { sendTransaction, simulateContract, writeContract } from '@wagmi/core';
import { type Address, erc20Abi, parseEther } from 'viem';
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

export const sendNative = async (to: Address, amount: bigint, isMax: boolean, config: Config) => {
	logger.start('sending', { to, amount }, isMax);

	const tx = await sendTransaction(config, {
		to,
		value: isMax ? amount - parseEther('0.01') : amount,
	});
	logger.success('sent', { tx });
	return tx;
};

export const getStoredAddress = async (): Promise<Address> => {
	// load from localstorage
	const storedAddress = localStorage.getItem('storedAddress');
	if (storedAddress) {
		return storedAddress as Address;
	}
	return ZeroAddress;
};
