import { ZeroAddress } from '@betfinio/abi';
import { useFundWallet } from '@privy-io/react-auth';
import { QrCodeIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

function ReceiveAction() {
	const { address = ZeroAddress, chain } = useAccount();
	const { fundWallet } = useFundWallet();

	const handleFund = useCallback(() => {
		if (address) {
			fundWallet(address, { chain: { id: chain?.id ?? 137 }, amount: 'BET or ', defaultFundingMethod: 'manual' });
		}
	}, [address, fundWallet]);
	return (
		<div className="flex flex-col items-center gap-2 w-full">
			<motion.div whileTap={{ scale: 0.95 }} onClick={handleFund} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
				<QrCodeIcon className="size-6 text-primary" />
			</motion.div>
			<div className="text-sm">Receive</div>
		</div>
	);
}

export default ReceiveAction;
