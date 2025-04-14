import { toast } from '@betfinio/components/ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@betfinio/components/ui';
import { Button } from '@betfinio/components/ui';
import { useCreateWallet } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { PlusIcon } from 'lucide-react';
import { LoaderIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { Address } from 'viem';

function CreateWalletDrawer({ onClose }: { onClose: () => void }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { createWallet } = useCreateWallet();
	const { wallets } = useWallets();
	const [newWallet, setNewWallet] = useState<Address | null>(null);
	const { setActiveWallet } = useSetActiveWallet();

	useEffect(() => {
		if (newWallet) {
			setOpen(false);
			onClose();
			toast.success('Wallet created successfully');
			const wallet = wallets.find((wallet) => wallet.address === newWallet);
			if (wallet) {
				setActiveWallet(wallet);
			}
		}
	}, [wallets, newWallet]);

	const handleCreateWallet = async () => {
		setLoading(true);
		const wallet = await createWallet({ createAdditional: true });
		setNewWallet(wallet.address as Address);
		setLoading(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="border-white/50 gap-2">
					<PlusIcon className="size-4" />
					Create new wallet
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[90vw] p-4">
				<DialogHeader className="text-center">
					<DialogTitle>Create new wallet</DialogTitle>
				</DialogHeader>
				<DialogDescription className="hidden" />
				<div className="flex flex-col gap-2 justify-between w-full">
					<h3 className="text-sm ">Are you sure you want to create a new wallet?</h3>
					<motion.div whileTap={{ scale: 0.97 }} className="flex flex-col gap-2">
						<Button className="w-full rounded-xl" onClick={handleCreateWallet} disabled={loading}>
							{loading ? <LoaderIcon className="size-4 animate-spin" /> : 'Create a new wallet'}
						</Button>
					</motion.div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CreateWalletDrawer;
