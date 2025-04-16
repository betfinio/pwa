import type { Address } from 'viem';

export interface Notification {
	id: string;
	type: NotificationType;
	data: string;
	address: Address;
	createdAt: number;
	transactionHash: Address;
}

export type NotificationType = 'TRANSFER' | 'PASS';
