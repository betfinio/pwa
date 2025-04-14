import logger from '@/src/config/logger';
import { mfQueryClient } from '@/src/config/query';
import { toast } from '@betfinio/components/ui';
import { useMutation } from '@tanstack/react-query';
import { waitForTransactionReceipt } from '@wagmi/core';
import type { Address } from 'viem';
import { useConfig } from 'wagmi';
import { sendERC20, sendNative } from '../api/wallet';

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
