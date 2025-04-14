import { UNISWAP_URL } from '@/src/globals';
import { Button, DrawerDescription } from '@betfinio/components/ui';
import { DrawerTitle } from '@betfinio/components/ui';
import { DrawerTrigger } from '@betfinio/components/ui';
import { Drawer } from '@betfinio/components/ui';
import { DrawerContent } from '@betfinio/components/ui';
import { DrawerHeader } from '@betfinio/components/ui';
import { RefreshCcwIcon } from 'lucide-react';
import { motion } from 'motion/react';

function SwapAction() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className="flex flex-col items-center gap-2 w-full">
					<motion.div whileTap={{ scale: 0.95 }} className="border border-border rounded-xl p-4 bg-background-lighter cursor-pointer">
						<RefreshCcwIcon className="size-6 text-primary" />
					</motion.div>
					<div className="text-sm">Swap</div>
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="pb-0">
					<DrawerTitle>Swap</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="flex flex-col gap-2 items-center justify-center p-4">
					<div className="text-sm">Swapping is possible on external DEXs like Uniswap.</div>
					<a href={UNISWAP_URL} target="_blank" rel="noreferrer">
						<Button>Navigate to Uniswap</Button>
					</a>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default SwapAction;
