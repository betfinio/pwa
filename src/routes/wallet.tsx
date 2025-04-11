import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { BetLogo } from '@betfinio/components/icons';
import { BetValue } from '@betfinio/components/shared';
import { Button } from '@betfinio/components/ui';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Link } from '@tanstack/react-router';
import { ArrowLeftRightIcon, ChevronRightIcon, LoaderIcon, LogOutIcon, QrCodeIcon, RefreshCcwIcon, ReplaceAllIcon, UploadIcon, WalletIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useAccount } from 'wagmi';
import { useAllowance, useBalance } from '../lib/query/context';
import type { RemoteModule } from '../types';

function WalletPage() {
	const { wallets, ready: walletsReady } = useWallets();
	const { ready, connectOrCreateWallet } = usePrivy();

	if (!ready || !walletsReady) {
		return (
			<div className="flex justify-center w-screen flex-row h-screen items-center">
				<LoaderIcon className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	const handleCreateWallet = async () => {
		await connectOrCreateWallet();
	};

	if (wallets.length === 0) {
		return (
			<div className="flex flex-col gap-4 justify-center w-full h-full items-center">
				No wallets found
				<Button onClick={handleCreateWallet}>Create new wallet</Button>
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-4 p-4">
			<ProfileLink />
			<BalanceSection />
			<ActionsSection />
			<AuthSection />
		</div>
	);
}

function AuthSection() {
	return (
		<div className="flex flex-col gap-4 justify-center w-full h-full items-center">
			<motion.div
				whileTap={{ scale: 0.97 }}
				className="flex flex-row gap-2 w-full justify-start items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
			>
				<ReplaceAllIcon className="size-6 text-success" />
				<div className="font-semibold">Change wallet</div>
			</motion.div>
			<motion.div
				whileTap={{ scale: 0.97 }}
				className="flex flex-row gap-2 w-full justify-start items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
			>
				<LogOutIcon className="size-6 text-destructive" />
				<div className="font-semibold">Logout</div>
			</motion.div>
		</div>
	);
}

function ActionsSection() {
	return (
		<div className="grid grid-cols-4 justify-between items-center w-full">
			<div className="flex flex-col items-center gap-2 w-full">
				<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
					<WalletIcon className="size-6 text-primary" />
				</motion.div>
				<div className="text-sm">Buy</div>
			</div>
			<div className="flex flex-col items-center gap-2 w-full">
				<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
					<RefreshCcwIcon className="size-6 text-primary" />
				</motion.div>
				<div className="text-sm">Swap</div>
			</div>
			<div className="flex flex-col items-center gap-2 w-full">
				<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
					<UploadIcon className="size-6 text-primary" />
				</motion.div>
				<div className="text-sm">Send</div>
			</div>
			<div className="flex flex-col items-center gap-2 w-full">
				<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
					<QrCodeIcon className="size-6 text-primary" />
				</motion.div>
				<div className="text-sm">Receive</div>
			</div>
		</div>
	);
}

function BalanceSection() {
	const { address = ZeroAddress } = useAccount();

	const { data: balance = 0n } = useBalance(address);
	const { data: allowance = 0n } = useAllowance(address);
	return (
		<div className="flex flex-col gap-4 justify-between items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Wallet balance</div>
				<BetValue value={balance} withIcon withMillify className="font-semibold" />
			</div>
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Available balance</div>
				<BetValue value={allowance} withIcon withMillify className="font-semibold" />
			</div>
			<div className="flex flex-row items-end justify-end w-full">
				<Button className="gap-2" variant="outline">
					<ArrowLeftRightIcon className="size-4" />
					Adjust spending limit
				</Button>
			</div>
		</div>
	);
}
function ProfileLink() {
	const { address = ZeroAddress } = useAccount();

	return (
		<Link to="/profile">
			<motion.div
				whileTap={{ scale: 0.97 }}
				className="flex flex-row gap-2 justify-between items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
			>
				<div className="flex flex-row gap-2 items-center">
					<div className="rounded-full border border-success p-1">
						<BetLogo className="size-6" />
					</div>
					<div className="flex flex-col">
						<div className="font-semibold text-lg leading-5">My Profile</div>
						<div className="text-xs text-muted-foreground">{truncateEthAddress(address)}</div>
					</div>
				</div>
				<div className="bg-white/20 rounded-lg p-1">
					<ChevronRightIcon className="size-5" />
				</div>
			</motion.div>
		</Link>
	);
}

export default WalletPage;
