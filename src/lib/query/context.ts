import { mfQueryClient } from '@/src/config/query';
import type { ContextApiModule, RemoteModule } from '@/src/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import type { Address } from 'viem';
import { useConfig } from 'wagmi';
import { useLoadRemoteModule } from './mf';

const MODULE: RemoteModule = 'betfinio_context';

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
