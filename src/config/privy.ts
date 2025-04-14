import type { PrivyClientConfig } from '@privy-io/react-auth';
import { polygon, polygonAmoy } from 'wagmi/chains';
// Replace this with your Privy config
export const privyConfig: PrivyClientConfig = {
	loginMethods: ['passkey', 'email', 'google', 'sms', 'telegram'],
	supportedChains: [polygon, polygonAmoy],
};
