import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@betfinio/components/ui';
import { useCreateWallet, useImportWallet, usePrivy, useWallets } from '@privy-io/react-auth';
import { ArrowLeftIcon, ImportIcon, LoaderIcon, PlusIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import SingleWallet from '../components/wallet/SingleWallet';
import logger from '../config/logger';
function WalletPage() {
	const { wallets } = useWallets();
	const { ready, connectOrCreateWallet, logout } = usePrivy();

	if (!ready) {
		return (
			<div className="flex justify-center w-full flex-row">
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
		<div className="flex flex-col gap-2 p-4">
			<div className="flex flex-row gap-2 items-center">
				<Button variant="outline" onClick={() => logout()}>
					Logout
				</Button>
			</div>
			My wallets
			<div className="flex flex-col gap-2">
				{wallets.map((wallet) => (
					<SingleWallet key={wallet.address} wallet={wallet} />
				))}
				<AddNewWallet />
			</div>
		</div>
	);
}

function AddNewWallet() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { createWallet } = useCreateWallet();
	const [importing, setImporting] = useState(false);
	const { importWallet } = useImportWallet();
	const [privateKey, setPrivateKey] = useState('');

	const handleCreateWallet = async () => {
		if (loading) return;
		try {
			setLoading(true);
			await createWallet({ createAdditional: true });
			setOpen(false);
			setLoading(false);
		} catch (error) {
			logger.error(error);
			setLoading(false);
		}
	};
	const handleImportWallet = async () => {
		await importWallet({ privateKey });
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full gap-1 border-border rounded-lg">
					<PlusIcon className="w-4 h-4" />
					Add new wallet
				</Button>
			</DialogTrigger>
			<DialogContent className="p-4 min-w-100 select-none">
				<DialogHeader>
					<DialogTitle className="text-center text-lg">Add wallet</DialogTitle>
				</DialogHeader>
				<AnimatePresence mode="sync">
					{!importing ? (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-2 text-sm">
							<motion.div
								onClick={handleCreateWallet}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className="flex flex-col border border-border cursor-pointer  p-4 rounded-lg gap-2 items-center"
							>
								{loading ? <LoaderIcon className="w-10 h-10 animate-spin" /> : <PlusIcon className="w-10 h-10" />}
								<div>Add a new Polygon wallet</div>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								onClick={() => setImporting(true)}
								className="flex flex-col border border-border cursor-pointer  p-4 rounded-lg gap-2 items-center"
							>
								<ImportIcon className="w-10 h-10" />
								<div>Import existing wallet</div>
							</motion.div>
						</motion.div>
					) : (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<Button onClick={() => setImporting(false)} variant="ghost">
								<ArrowLeftIcon className="w-4 h-4" />
								Back
							</Button>

							<textarea
								name="privateKey"
								id="privateKey"
								value={privateKey}
								onChange={(e) => setPrivateKey(e.target.value)}
								className="w-full h-40 border border-border rounded-lg p-2"
							/>
							<div className="flex flex-col gap-2">
								<Button variant="outline">Cancel</Button>
								<Button onClick={handleImportWallet}>Import wallet</Button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
}

export default WalletPage;
