import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { BetLogo } from '@betfinio/components/icons';
import { BetValue } from '@betfinio/components/shared';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	toast,
} from '@betfinio/components/ui';
import { useImportWallet, useLogout, usePrivy, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { Link } from '@tanstack/react-router';
import {
	ArrowLeftRightIcon,
	ChevronRightIcon,
	DownloadIcon,
	LoaderIcon,
	LogOutIcon,
	PlusIcon,
	QrCodeIcon,
	RefreshCcwIcon,
	ReplaceAllIcon,
	UploadIcon,
	WalletIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
import SingleWallet from '../components/wallet/SingleWallet';
import { useAllowance, useBalance } from '../lib/query/context';

function WalletPage() {
	const { wallets, ready: walletsReady } = useWallets();
	const { ready, login, authenticated, user } = usePrivy();

	if (!ready || !walletsReady) {
		return (
			<div className="flex justify-center w-screen flex-row h-screen items-center">
				<LoaderIcon className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	const handleLogin = async () => {
		await login();
	};

	if (!authenticated) {
		return (
			<div className="flex flex-col gap-4 justify-evenly w-full h-screen items-center p-4">
				<div className="border border-primary rounded-full p-4">
					<BetLogo className="size-12" />
				</div>
				<Button onClick={handleLogin}>Login or sign up</Button>
			</div>
		);
	}
	if (wallets.length === 0) {
		return (
			<div className="flex flex-col gap-4  w-full h-screen items-center p-4">
				<h2 className="text-2xl font-semibold">Welcome to Betfin</h2>
				<div className="text-muted-foreground">Are you existing user?</div>
				<ImportWalletDrawer />
				<div className="text-muted-foreground">Are you new user?</div>
				<CreateWalletDrawer />
				<LogoutDialog />
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

function CreateWalletDrawer() {
	const { createWallet } = usePrivy();

	const handleCreateWallet = async () => {
		// await createWallet();
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline" className="border-white/50 gap-2">
					<PlusIcon className="size-4" />
					Create new wallet
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Create new wallet</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="flex flex-col gap-2 p-4">Not supported yet</div>
			</DrawerContent>
		</Drawer>
	);
}

function AuthSection() {
	return (
		<div className="flex flex-col gap-4 justify-center w-full h-full items-center">
			<ChangeWalletDrawer />
			<LogoutDialog />
		</div>
	);
}

function LogoutDialog() {
	const { logout } = useLogout();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.div
					whileTap={{ scale: 0.97 }}
					className="flex flex-row gap-2 w-full justify-start items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
				>
					<LogOutIcon className="size-6 text-destructive" />
					<div className="font-semibold">Logout</div>
				</motion.div>
			</DialogTrigger>
			<DialogContent className="p-4 w-[90vw]">
				<DialogHeader>
					<DialogTitle className="text-center">Logout</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-center text-sm text-muted-foreground">Are you sure you want to logout?</DialogDescription>
				<DialogFooter>
					<motion.div whileTap={{ scale: 0.97 }} className="w-full flex justify-center">
						<Button variant="destructive" onClick={logout} className="gap-2 w-full">
							<LogOutIcon className="size-4" />
							Logout
						</Button>
					</motion.div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function ChangeWalletDrawer() {
	const { wallets } = useWallets();
	const [open, setOpen] = useState(false);
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<motion.div
					whileTap={{ scale: 0.97 }}
					className="flex flex-row gap-2 w-full justify-start items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
				>
					<ReplaceAllIcon className="size-6 text-success" />
					<div className="font-semibold">Change wallet</div>
				</motion.div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>My wallets</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="min-h-[50vh] flex flex-col justify-between  p-4">
					<div className="flex flex-col gap-2">
						{wallets.map((wallet) => (
							<SingleWallet key={wallet.address} wallet={wallet} onClose={() => setOpen(false)} />
						))}
					</div>
					<AddWalletDrawer />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function AddWalletDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<motion.div whileTap={{ scale: 0.97 }}>
					<Button variant="outline" className="w-full border-primary gap-2">
						<PlusIcon className="size-4" />
						Add wallet
					</Button>
				</motion.div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Add wallet</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="flex flex-col gap-2 p-4">
					<motion.div whileTap={{ scale: 0.97 }}>
						<Button variant="outline" className="w-full border-white/50 gap-2">
							<PlusIcon className="size-4" />
							Add a new Polygon wallet
						</Button>
					</motion.div>
					<ImportWalletDrawer />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function ImportWalletDrawer() {
	const [open, setOpen] = useState(false);
	const [privateKey, setPrivateKey] = useState('');
	const { importWallet } = useImportWallet();
	const { setActiveWallet } = useSetActiveWallet();
	const { wallets } = useWallets();
	const [newWallet, setNewWallet] = useState<Address | null>(null);

	useEffect(() => {
		const wallet = wallets.find((wallet) => wallet.address === newWallet);
		if (wallet) {
			setActiveWallet(wallet);
		}
	}, [newWallet]);

	const handleImportWallet = async () => {
		try {
			const wallet = await importWallet({ privateKey });
			setNewWallet(wallet.address as Address);
			toast.success('Wallet imported successfully');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<motion.div whileTap={{ scale: 0.97 }}>
					<Button variant="outline" className="w-full border-white/50 gap-2">
						<DownloadIcon className="size-4" />
						Import existing wallet
					</Button>
				</motion.div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Import wallet</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="flex flex-col gap-2 p-4 min-h-[50vh] justify-between w-full">
					<div className="flex flex-col gap-2">
						<h3 className="text-sm text-muted-foreground">Paste your private key</h3>
						<textarea
							placeholder="e.g. 0x1234567890abcdef"
							className="w-full border border-border rounded-xl p-4 h-[25vh] bg-background-lighter"
							value={privateKey}
							onChange={(e) => setPrivateKey(e.target.value)}
						/>
					</div>
					<motion.div whileTap={{ scale: 0.97 }} className="w-full">
						<Button className="gap-2 w-full" onClick={handleImportWallet}>
							<DownloadIcon className="size-4" />
							Import
						</Button>
					</motion.div>
				</div>
			</DrawerContent>
		</Drawer>
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
	// available is min of balance and allowance
	const available = balance > allowance ? allowance : balance;
	return (
		<div className="flex flex-col gap-4 justify-between items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Wallet balance</div>
				<BetValue value={balance} withIcon withMillify className="font-semibold" precision={3} />
			</div>
			<div className="flex flex-row gap-2 justify-between items-center w-full">
				<div className="text-muted-foreground">Available balance</div>
				<BetValue value={available} withIcon withMillify className="font-semibold" precision={3} />
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
