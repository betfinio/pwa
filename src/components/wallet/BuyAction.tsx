import { TOKEN_ADDRESS } from '@/src/globals';
import { useFundWallet } from '@privy-io/react-auth';
import { WalletIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

function BuyAction() {
	const { fundWallet } = useFundWallet();
	const { address } = useAccount();
	const handleFund = useCallback(() => {
		if (address) {
			fundWallet(address, { chain: { id: 137 }, asset: { erc20: TOKEN_ADDRESS } });
		}
	}, [address, fundWallet]);
	return (
		<div className="flex flex-col items-center gap-2 w-full" onClick={handleFund}>
			<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
				<WalletIcon className="size-6 text-primary" />
			</motion.div>
			<div className="text-sm">Buy</div>
		</div>
	);
}

export default BuyAction;
