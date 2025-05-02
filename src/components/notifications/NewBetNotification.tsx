import { mfQueryClient } from '@/src/config/query';
import { useBetInfo } from '@/src/lib/query/bet';
import { useLoadRemoteModule } from '@/src/lib/query/mf';
import type { ContextGlobalsModule } from '@/src/types';
import type { Notification } from '@/src/types/notifications';
import { BetValue } from '@betfinio/components';
import { RouletteIcon } from '@betfinio/components/icons';
import { UserCircleIcon } from 'lucide-react';
import BaseNotification from './BaseNotification';

function NewBetNotification({ notification }: { notification: Notification }) {
	const globals = useLoadRemoteModule<ContextGlobalsModule>(mfQueryClient, 'betfinio_context', 'globals');
	const data = JSON.parse(notification.data);
	const { data: betData } = useBetInfo(data.bet);
	const getIcon = () => {
		if (globals?.ROULETTE_ADDRESS.toLowerCase() === data.game) {
			return <RouletteIcon className="size-8 p-1 text-destructive" />;
		}
		return <UserCircleIcon className="size-8 p-1 text-success" />;
	};

	const getDescription = () => {
		if (globals?.ROULETTE_ADDRESS.toLowerCase() === data.game) {
			return 'You placed a bet on roulette!';
		}
		return 'You placed a bet!';
	};
	return (
		<BaseNotification
			icon={getIcon()}
			title={'Bet placed!'}
			description={getDescription()}
			value={<BetValue value={-BigInt(betData?.amount ?? 0)} withIcon iconClassName="size-3" />}
		/>
	);
}

export default NewBetNotification;
