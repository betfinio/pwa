import { Affiliate, Bank, Lobby, LuckyRound, MoneyHand, Predict, Roadmap, Roulette, Slots, Staking, Stones, Ticket } from '@betfinio/components/icons';
import { ArrowUpDown, Binary, BookA, ChartSpline, NetworkIcon, WorkflowIcon } from 'lucide-react';
import type { NavItemProps } from '../components/NavItem';

const navigation: NavItemProps[] = [
	{
		label: 'staking',
		disabled: false,
		icon: <Staking className={'w-4 h-4'} />,
		href: '/staking',
		children: [
			{ label: 'staking-conservative', href: '/staking/conservative', disabled: false, icon: <Bank className={'w-4 h-4'} /> },
			{ label: 'staking-dynamic', href: '/staking/dynamic', disabled: false, icon: <MoneyHand className={'w-4 h-4'} /> },
		],
	},
	{
		label: 'affiliate',
		icon: <Affiliate className={'w-4 h-4'} />,
		href: '/affiliate',
		disabled: false,

		children: [
			{ label: 'affiliate-overview', href: '/affiliate', disabled: false, icon: <Affiliate className={'w-4 h-4'} /> },
			{ label: 'affiliate-linear-tree', href: '/affiliate/linear', disabled: false, icon: <WorkflowIcon className={'w-4 h-4'} /> },
			{ label: 'affiliate-binary-tree', href: '/affiliate/binary', disabled: false, icon: <NetworkIcon className={'w-4 h-4'} /> },
		],
	},
];
const games: NavItemProps[] = [
	{ label: 'lobby', icon: <Lobby className={'w-4 h-4'} />, href: '/app', disabled: false },
	{ label: 'lottery', icon: <Ticket className={'w-4 h-4'} />, href: '/games/lottery', disabled: false },
	{
		label: 'roulette',
		icon: <Roulette className={'w-4 h-4'} />,
		href: '/games/roulette',
		disabled: false,
		children: [
			{ label: 'roulette-single', href: '/games/roulette/single', disabled: false },
			{ label: 'roulette-90', href: '/games/roulette/live/90', disabled: false },
			{ label: 'roulette-180', href: '/games/roulette/live/180', disabled: false },
		],
	},
	{
		label: 'luro',
		icon: <LuckyRound className={'w-4 h-4'} />,
		href: '/games/luro',
		disabled: false,
		children: [
			{ label: 'luro-5m', href: '/games/luro/5m', disabled: false },
			{ label: 'luro-1d', href: '/games/luro/1d', disabled: false },
		],
	},
	{ label: 'stones', icon: <Stones className={'w-4 h-4'} />, href: '/games/stones', disabled: false },
	{ label: 'predict', icon: <Predict className={'w-4 h-4'} />, href: '/games/predict', disabled: false },
	{ label: 'hilo', icon: <ArrowUpDown className={'w-4 h-4'} />, href: '/games/hilo' },
	{ label: 'binary', icon: <Binary className={'w-4 h-4'} />, href: '/games/poker' },
	{ label: 'slots', icon: <Slots className={'w-4 h-4'} />, href: '/games/slots' },
];

const statistics: NavItemProps = {
	label: 'statistics',
	icon: <ChartSpline className={'w-4 h-4'} />,
	disabled: false,
	href: '/statistics',
};
const academy: NavItemProps = {
	label: 'academy',
	icon: <BookA className={'w-4 h-4'} />,
	disabled: false,
	href: '/academy/advanced',
};

const others: NavItemProps[] = [
	academy,
	statistics,
	{
		label: 'documentation',
		icon: <Roadmap className={'w-4 h-4'} />,
		external: true,
		href: 'https://betfin.gitbook.io/betfin-public/v/about-betfin-1',
	},
];
export { navigation, games, others };
