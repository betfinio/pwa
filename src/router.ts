import { createRootRoute, createRoute, createRouter, lazyRouteComponent, redirect } from '@tanstack/react-router';

import Balance from './routes/balance';
import Notifications from './routes/notifications';
import Profile from './routes/profile';
import Root from './routes/root';
import Wallet from './routes/wallet';

const rootRoute = createRootRoute({
	component: Root,
});

const indexHTMLRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/index.html',
	beforeLoad: async () => {
		throw redirect({ to: '/wallet' });
	},
});
const balanceRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/balance',
	component: Balance,
});

const profileRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/profile',
	component: Profile,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: async () => {
		throw redirect({ to: '/wallet' });
	},
});

const notificationsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/notifications',
	component: Notifications,
});

const walletRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/wallet',
	component: Wallet,
});

const indexStakingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/staking',
	beforeLoad: async () => {
		throw redirect({
			to: '/staking/conservative',
		});
	},
});

const conservativeStakingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/staking/conservative',
	component: lazyRouteComponent(() => import('./routes/staking/conservative')),
});
const dynamicStakingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/staking/dynamic',
	component: lazyRouteComponent(() => import('./routes/staking/dynamic')),
});

const indexRouletteRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/roulette',
	beforeLoad: async () => {
		throw redirect({ to: '/games/roulette/live' });
	},
});

const rouletteLayoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'roulette-layout',
	component: lazyRouteComponent(() => import('./routes/games/roulette/layout')),
});

const singleRouletteRoute = createRoute({
	getParentRoute: () => rouletteLayoutRoute,
	path: '/games/roulette/single',
	component: lazyRouteComponent(() => import('./routes/games/roulette/single')),
});

const liveIndexRouletteRoute = createRoute({
	getParentRoute: () => rouletteLayoutRoute,
	path: '/games/roulette/live',
	component: lazyRouteComponent(() => import('./routes/games/roulette/live/index')),
});

const liveTableRouletteRoute = createRoute({
	getParentRoute: () => rouletteLayoutRoute,
	path: '/games/roulette/live/$table',
	component: lazyRouteComponent(() => import('./routes/games/roulette/live/table')),
});

const indexPredictRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/predict',
	beforeLoad: async () => {
		throw redirect({ to: '/games/predict/$pair', params: { pair: 'BTCUSDT' } });
	},
});

const predictRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/predict/$pair',
	component: lazyRouteComponent(() => import('./routes/games/predict/pair')),
});

const luroIndexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/luro',
	beforeLoad: async () => {
		throw redirect({ to: '/games/luro/$interval', params: { interval: '5m' } });
	},
});

const luroIntervalRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/luro/$interval',
	component: lazyRouteComponent(() => import('./routes/games/luro/interval')),
});

const stonesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/stones',
	component: lazyRouteComponent(() => import('./routes/games/stones/index')),
});

const affiliateRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/affiliate',
	component: lazyRouteComponent(() => import('./routes/affiliate/index')),
});

const linearTreeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/affiliate/linear',
	component: lazyRouteComponent(() => import('./routes/affiliate/linear')),
});

const binaryTreeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/affiliate/binary',
	component: lazyRouteComponent(() => import('./routes/affiliate/binary')),
});

const lotteryRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/lottery/lotto',
	component: lazyRouteComponent(() => import('./routes/games/lottery/lotto/index')),
});

const lotteryRoundRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/lottery/lotto/$round',
	component: lazyRouteComponent(() => import('./routes/games/lottery/lotto/round')),
});

const lotteryIntervalRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/games/lottery/',
	beforeLoad: async () => {
		throw redirect({ to: '/games/lottery/lotto' });
	},
});

const statisticsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/statistics',
	component: lazyRouteComponent(() => import('./routes/statistics')),
});
// academy routes
const layoutAcademyRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'academy-layout',
	component: lazyRouteComponent(() => import('./routes/academy/index')),
});

const advancedAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/advanced',
	component: lazyRouteComponent(() => import('./routes/academy/advanced')),
});

const lessonAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/lesson/$section/$lesson',
	component: lazyRouteComponent(() => import('./routes/academy/lesson.section.lesson')),
});

const indexAcademyRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/academy',
	beforeLoad: async () => {
		throw redirect({
			to: '/academy/lesson/$section/$lesson',
			params: { section: '1', lesson: '1' },
		});
	},
});
const sectionAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/lesson/$section',
	component: lazyRouteComponent(() => import('./routes/academy/lesson.section')),
});
const newAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/new',
	// validateSearch: (await loadRemoteModule<{ falidateRef: () => void }>('betfinio_context', 'lib/utils')).falidateRef, todo
	beforeLoad: async () => {
		throw redirect({
			to: '/academy/lesson/$section/$lesson',
			params: { section: '1', lesson: '1' },
		});
	},
});
const eventsAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/events',
	validateSearch: (search: Record<string, unknown>) => {
		if (!search.event) return {};
		return { event: Number(search.event) };
	},
	component: lazyRouteComponent(() => import('./routes/academy/events')),
});
const documentsAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/docs',
	component: lazyRouteComponent(() => import('./routes/academy/docs')),
});
const createAcademyRoute = createRoute({
	getParentRoute: () => layoutAcademyRoute,
	path: '/academy/lesson/create',
	component: lazyRouteComponent(() => import('./routes/academy/lesson.create')),
});

const appRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/app',
	component: lazyRouteComponent(() => import('./routes/app')),
});

rootRoute.addChildren([
	indexHTMLRoute,
	indexRoute,
	walletRoute,
	profileRoute,
	indexStakingRoute,
	conservativeStakingRoute,
	dynamicStakingRoute,
	stonesRoute,
	indexRouletteRoute,
	rouletteLayoutRoute,
	liveTableRouletteRoute,
	singleRouletteRoute,
	liveIndexRouletteRoute,
	indexPredictRoute,
	predictRoute,
	luroIndexRoute,
	luroIntervalRoute,
	affiliateRoute,
	linearTreeRoute,
	binaryTreeRoute,
	lotteryRoute,
	lotteryIntervalRoute,
	lotteryRoundRoute,
	statisticsRoute,
	layoutAcademyRoute,
	advancedAcademyRoute,
	lessonAcademyRoute,
	indexAcademyRoute,
	sectionAcademyRoute,
	newAcademyRoute,
	eventsAcademyRoute,
	documentsAcademyRoute,
	createAcademyRoute,
	appRoute,
	notificationsRoute,
	balanceRoute,
]);
const router = createRouter({
	routeTree: rootRoute,
});

export default router;
