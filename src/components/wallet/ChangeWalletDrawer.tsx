import { Drawer, ScrollArea } from '@betfinio/components/ui';
import { DrawerDescription } from '@betfinio/components/ui';
import { DrawerHeader } from '@betfinio/components/ui';
import { DrawerTitle } from '@betfinio/components/ui';
import { DrawerTrigger } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { useWallets } from '@privy-io/react-auth';
import { ReplaceAllIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import type { Address } from 'viem';
import AddWalletDrawer from './AddWalletDrawer';
import SingleWallet from './SingleWallet';

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
				<div className="min-h-[50vh] flex flex-col justify-between  p-4 gap-4">
					<ScrollArea className="h-[50vh]">
						<div className="flex flex-col gap-2">
							{wallets.map((wallet) => (
								<SingleWallet key={wallet.address} wallet={wallet.address as Address} onClose={() => setOpen(false)} />
							))}
						</div>
					</ScrollArea>
					<AddWalletDrawer />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default ChangeWalletDrawer;
