import { RefreshCcwIcon, SendIcon, UploadIcon, WalletIcon } from 'lucide-react';
import { motion } from 'motion/react';
import BuyAction from './BuyAction';
import ReceiveAction from './ReceiveAction';
import SendAction from './SendAction';
import SwapAction from './SwapAction';

function ActionsSection() {
	return (
		<div className="grid grid-cols-4 justify-between items-center w-full">
			<BuyAction />
			<SwapAction />
			<SendAction />
			<ReceiveAction />
		</div>
	);
}

export default ActionsSection;
