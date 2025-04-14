import logger from '@/src/config/logger';
import { mfQueryClient } from '@/src/config/query';
import { ZeroAddress } from '@betfinio/abi';
import { toast } from '@betfinio/components/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { waitForTransactionReceipt } from '@wagmi/core';
import type { Address } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { getStoredAddress, sendERC20, sendNative } from '../api/wallet';

export const useSendERC20 = () => {
	const config = useConfig();
	return useMutation<any, Error, { to: Address; amount: bigint }>({
		mutationFn: (data) => sendERC20(data.to, data.amount, config),
		onError: (error) => {
			logger.error('error', error);
		},
		onSuccess: async (data) => {
			logger.success('success', data);
			const promise = async () => {
				await waitForTransactionReceipt(config, data);
			};
			toast.promise(promise, {
				loading: 'Sending...',
				success: 'Sent!',
				error: 'Error sending',
			});
		},
	});
};

export const useSendNative = () => {
	const config = useConfig();
	return useMutation<any, Error, { to: Address; amount: bigint; isMax: boolean }>({
		mutationFn: (data) => sendNative(data.to, data.amount, data.isMax, config),
		onError: (error) => {
			logger.error('error', error);
		},
		onSuccess: async (data) => {
			const promise = async () => {
				await waitForTransactionReceipt(config, data);
				await mfQueryClient.invalidateQueries({ queryKey: ['balance'] });
				await mfQueryClient.invalidateQueries({ queryKey: ['allowance'] });
			};
			toast.promise(promise, {
				loading: 'Sending...',
				success: 'Sent!',
				error: 'Error sending',
			});
		},
	});
};

export const useStoredAddress = () => {
	const query = useQuery<Address>({
		queryKey: ['storedAddress'],
		queryFn: () => getStoredAddress(),
		initialData: (localStorage.getItem('storedAddress') as Address) ?? ZeroAddress,
	});
	const updateAddress = (addr: Address) => {
		localStorage.setItem('storedAddress', addr);
		query.refetch();
	};
	return { ...query, updateAddress };
};
