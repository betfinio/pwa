import { Button, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, toast } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { Drawer } from '@betfinio/components/ui';
import { useImportWallet, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { DownloadIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Address } from 'viem';

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

export default ImportWalletDrawer;
