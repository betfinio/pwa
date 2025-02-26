import { createRootRoute, createRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import Root from "./routes/root";
import Index from "./routes";
import Wallet from "./routes/wallet";

const rootRoute = createRootRoute({
  component: Root,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})
const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallet',
  component: Wallet,
})

const conservativeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/staking/conservative',
  component: lazyRouteComponent(() => import('./pages/staking/conservative')),
})

const dynamicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/staking/dynamic',
  component: lazyRouteComponent(() => import('./pages/staking/dynamic')),
})

rootRoute.addChildren([indexRoute, walletRoute, conservativeRoute, dynamicRoute]);
const router = createRouter({
  routeTree: rootRoute,
});

export default router;
