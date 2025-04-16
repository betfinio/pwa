import { CheckCircleIcon, UserCircleIcon } from 'lucide-react';
import BaseNotification from './BaseNotification';

function PassNotification() {
	return (
		<BaseNotification
			icon={<UserCircleIcon className="size-8 text-success" />}
			title={'Welcome!'}
			description={'You have successfully minted NFT Pass'}
			value={<CheckCircleIcon className="size-4 text-success" />}
		/>
	);
}

export default PassNotification;
