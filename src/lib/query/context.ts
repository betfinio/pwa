import logger from '@/src/config/logger';
import { mfQueryClient } from '@/src/config/query';
import type { ContextApiModule, ContextConfigModule, ContextGqlModule, ContextUtilsModule, MintResult, RemoteModule, TreeMember } from '@/src/types';
import { toast } from '@betfinio/components/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Address } from 'viem';
import { useConfig } from 'wagmi';
import { loadRemoteModule } from '../api/mf';
import { useLoadRemoteModule } from './mf';

const MODULE: RemoteModule = 'betfinio_context';

export const useIsMember = (address: Address) => {
	const config = useConfig();
	const api = useLoadRemoteModule<ContextApiModule>(mfQueryClient, MODULE, 'lib/api');

	const func = useCallback(
		async (addr: Address) => {
			if (api) {
				return await api.isMember(addr, config);
			}
			return null;
		},
		[api],
	);

	return useQuery<boolean | null, Error>(
		{
			queryKey: ['isMember', address, api],
			queryFn: () => func(address),
		},
		mfQueryClient,
	);
};

export const useTreeMember = (address: Address) => {
	const gql = useLoadRemoteModule<ContextGqlModule>(mfQueryClient, MODULE, 'lib/gql');

	const func = useCallback(
		async (addr: Address) => {
			if (gql) {
				return await gql.fetchTreeMember(addr);
			}
			return null;
		},
		[gql],
	);

	return useQuery<TreeMember | null, Error>(
		{
			queryKey: ['treeMember', address, gql],
			queryFn: () => func(address),
		},
		mfQueryClient,
	);
};

export const useRegistrationDate = (address: Address) => {
	const gql = useLoadRemoteModule<ContextGqlModule>(mfQueryClient, MODULE, 'lib/gql');

	const func = useCallback(
		async (addr: Address) => {
			if (gql) {
				return await gql.fetchRegistrationDate(addr);
			}
			return Date.now();
		},
		[gql],
	);

	return useQuery<number | null, Error>(
		{
			queryKey: ['registrationDate', address, gql],
			queryFn: () => func(address),
		},
		mfQueryClient,
	);
};

export const useUsername = (address: Address, me: Address) => {
	const api = useLoadRemoteModule<ContextApiModule>(mfQueryClient, MODULE, 'lib/api');

	const func = useCallback(
		async (addr: Address) => {
			if (api) {
				const username = await api.fetchUsername(addr, null, me);
				return username;
			}
			return null;
		},
		[api],
	);

	return useQuery<string | null, Error>(
		{
			queryKey: ['username', address, me, api],
			queryFn: () => func(address),
		},
		mfQueryClient,
	);
};

export const useBalance = (address: Address) => {
	const config = useConfig();
	const api = useLoadRemoteModule<ContextApiModule>(mfQueryClient, MODULE, 'lib/api');

	const func = useCallback(
		async (addr: Address) => {
			if (api) {
				return await api.fetchBalance(addr, config, 0n);
			}
			return 0n;
		},
		[api],
	);

	return useQuery<bigint, Error>(
		{
			queryKey: ['balance', address, api],
			queryFn: () => func(address),
		},
		mfQueryClient,
	);
};

export const useAllowance = (address: Address) => {
	const config = useConfig();
	const api = useLoadRemoteModule<ContextApiModule>(mfQueryClient, MODULE, 'lib/api');

	const func = useCallback(
		async (addr: Address) => {
			if (api) {
				return await api.fetchAllowance(addr, config);
			}
			return 0n;
		},
		[api],
	);

	return useQuery<bigint, Error>(
		{
			queryKey: ['allowance', address, api],
			queryFn: () => func(address),
		},
		mfQueryClient,
	);
};

export const useIncreaseAllowance = () => {
	return useMutation(
		{
			mutationFn: async () => {
				logger.start('fetching api');
				// get api from context
				const api = await loadRemoteModule<ContextApiModule>(MODULE, 'lib/api');
				if (!api) {
					throw new Error('Context api not found');
				}
				// get config from context
				const config = await loadRemoteModule<ContextConfigModule>(MODULE, 'config');
				if (!config) {
					throw new Error('Context config not found');
				}
				logger.success('fetched api');
				const result = await api.increaseAllowance(config.wagmiConfig);
				logger.success('incremented allowance', result);
				mfQueryClient.invalidateQueries({ queryKey: ['allowance'] });
				return result;
			},
			onError: (error) => {
				logger.error('error', error);
			},
			onSuccess: (data) => {
				toast.success('Allowance increased!');
				logger.success('success', data);
			},
		},
		mfQueryClient,
	);
};

export const useMintPass = () => {
	return useMutation<any, Error, { address: Address; ref: string }>({
		mutationFn: async ({ address, ref }) => {
			logger.start('fetching api');
			// get utils from context
			const utils = await loadRemoteModule<ContextUtilsModule>(MODULE, 'lib/utils');
			if (!utils) {
				throw new Error('Context utils not found');
			}
			// get api from context
			const api = await loadRemoteModule<ContextApiModule>(MODULE, 'lib/api');
			if (!api) {
				throw new Error('Context api not found');
			}
			// get config from context
			const config = await loadRemoteModule<ContextConfigModule>(MODULE, 'config');
			if (!config) {
				throw new Error('Context config not found');
			}
			logger.success('fetched api');
			const validateRef = utils.validateRef;

			// check if ref old is new
			const isCode = ref.startsWith('0x');
			const input = isCode ? { code: ref } : { ref: ref };
			logger.info(isCode ? 'code' : 'ref');
			// check if ref is valid
			const validRef = validateRef(input);
			if (Object.keys(validRef).length === 0) {
				throw new Error('Invalid ref');
			}
			logger.start('fetching mint info');
			let mintResult: MintResult = { error: 'invalid ref' };
			// mint pass
			if (isCode) {
				mintResult = await utils.handleCodeMint(validRef, address);
			} else {
				mintResult = await utils.handleRefMint(validRef, address, config.wagmiConfig);
			}
			const isError = 'error' in mintResult;
			logger.success('fetched mint info', mintResult);
			if (isError) {
				// @ts-ignore
				throw new Error(mintResult.error);
			}
			const { inviter, parent } = mintResult as { inviter: Address; parent: Address };
			const result = await api.mint(address, inviter, parent, config.wagmiConfig);
			logger.success('minted pass', result);
			mfQueryClient.invalidateQueries({ queryKey: ['isMember'] });
			return mintResult;
		},
		onError: (error) => {
			logger.error('error', error);
		},
		onSuccess: (data) => {
			toast.success('Pass is minted!');
			logger.success('success', data);
		},
	});
};
