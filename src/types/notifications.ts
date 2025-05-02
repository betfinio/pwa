import type { Address } from 'viem';

export interface Notification {
	id: string;
	type: NotificationType;
	data: string;
	address: Address;
	createdAt: number;
	transactionHash: Address;
}

export type NotificationType =
	| 'TRANSFER'
	| 'PASS'
	| 'CONSERVATIVE_STAKE'
	| 'DYNAMIC_STAKE'
	| 'CONSERVATIVE_CLAIMED'
	| 'DYNAMIC_CLAIMED'
	| 'NEW_BET'
	| 'CONSERVATIVE_CLAIMABLE';
