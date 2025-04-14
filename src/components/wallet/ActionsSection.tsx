import { RefreshCcwIcon, SendIcon, UploadIcon, WalletIcon } from 'lucide-react';
import { motion } from 'motion/react';
import ReceiveAction from './ReceiveAction';
import SendAction from './SendAction';

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
			<SendAction />
			<ReceiveAction />
		</div>
	);
}

export default ActionsSection;
