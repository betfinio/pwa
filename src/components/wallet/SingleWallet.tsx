import { useStoredAddress } from '@/src/lib/query/wallet';
import { truncateEthAddress } from '@betfinio/abi';
import { BetLogo, Fox } from '@betfinio/components/icons';
import { Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, toast } from '@betfinio/components/ui';
import { type ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { CopyIcon, DownloadIcon, EllipsisVerticalIcon, PlugZapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

function SingleWallet({ wallet, onClose }: { wallet: Address; onClose: () => void }) {
	const { exportWallet } = usePrivy();
	const { setActiveWallet } = useSetActiveWallet();
	const { address } = useAccount();
	const { wallets } = useWallets();
	const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
	const { updateAddress } = useStoredAddress();

	useEffect(() => {
		const connectedWallet = wallets.find((w) => w.address === wallet);
		if (connectedWallet) {
			setConnectedWallet(connectedWallet);
		}
	}, [wallets, wallet]);

	const handleExportWallet = async () => {
		await exportWallet({ address: wallet });
	};
	const handleConnectWallet = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (connectedWallet) {
			await setActiveWallet(connectedWallet);
			updateAddress(wallet);
			onClose();
		}
	};
	const handleCopyAddress = () => {
		navigator.clipboard.writeText(wallet);
		toast.success('Address copied to clipboard');
	};

	return (
		<motion.div
			onClick={handleConnectWallet}
			className="p-3 w-full border border-border rounded-xl flex items-center justify-between bg-background flex-row gap-2"
			whileTap={{ scale: 0.97 }}
		>
			<div className="flex items-center gap-2 justify-between w-full">
				<div className="flex flex-row items-center gap-2">
					<div className="rounded-full border border-primary p-2 ">
						{connectedWallet?.walletClientType === 'metamask' ? <Fox className="size-4" /> : <BetLogo className="size-4" />}
					</div>
					<div className="text-sm">{truncateEthAddress(wallet)}</div>
				</div>
				<div className="flex flex-row items-center gap-2">
					{connectedWallet?.imported && <Badge>Imported</Badge>}
					{connectedWallet?.connectorType === 'injected' && <Badge>Injected</Badge>}
					{address === wallet && <Badge className="bg-success text-success-foreground">Connected</Badge>}
				</div>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger className="flex items-center justify-center">
						<EllipsisVerticalIcon className="w-4 h-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className="flex items-center gap-2 " onClick={handleConnectWallet}>
							<PlugZapIcon className="w-4 h-4" /> Connect wallet
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex items-center gap-2 " onClick={handleCopyAddress}>
							<CopyIcon className="w-4 h-4" /> Copy address
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-2 " onClick={handleExportWallet}>
							<DownloadIcon className="w-4 h-4" /> Export private key
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</motion.div>
	);
}

export default SingleWallet;
