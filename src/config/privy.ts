import type { PrivyClientConfig } from '@privy-io/react-auth';
import { wagmiConfig } from 'betfinio_context/config';

// Replace this with your Privy config
export const privyConfig: PrivyClientConfig = {
  loginMethods: ['passkey'],
  supportedChains: [wagmiConfig.chains[1]],
};