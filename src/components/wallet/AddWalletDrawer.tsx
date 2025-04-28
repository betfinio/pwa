import { Fox } from '@betfinio/components/icons';
import { Button } from '@betfinio/components/ui';
import { DrawerTrigger } from '@betfinio/components/ui';
import { DrawerTitle } from '@betfinio/components/ui';
import { DrawerDescription, DrawerHeader } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { Drawer } from '@betfinio/components/ui';
import { usePrivy } from '@privy-io/react-auth';
import { PlusIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import CreateWalletDrawer from './CreateWalletDrawer';
import ImportWalletDrawer from './ImportWalletDrawer';

function AddWalletDrawer() {
	const [open, setOpen] = useState(false);
	const { connectWallet } = usePrivy();
	const handleClose = () => {
		setOpen(false);
	};
	const handleConnect = () => {
		setOpen(false);
		connectWallet();
	};
	return (
		<Drawer open={open} onOpenChange={setOpen}>
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
					<CreateWalletDrawer onClose={handleClose} />
					<ImportWalletDrawer />
					<Button className="gap-2 border-white/50" variant="outline" onClick={handleConnect}>
						<Fox className="size-4" />
						Connect wallet
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default AddWalletDrawer;
