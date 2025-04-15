import { useMediaQuery } from '@betfinio/components/hooks';
import { SidebarProvider } from '@betfinio/components/ui';
import { useWallets } from '@privy-io/react-auth';
import { Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import CustomSidebar from '../components/CustomSidebar';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { NOTIFICATIONS_URL } from '../globals';

function Root() {
	const { isMobile, isTablet } = useMediaQuery();
	const isVisible = isMobile || isTablet;
	const { wallets, ready } = useWallets();
	const [hasController, setHasController] = useState<boolean>(!!navigator.serviceWorker.controller);

	navigator.serviceWorker.ready.then((registration) => {
		registration.active?.postMessage('ping');
		setHasController(true);
	});

	useEffect(() => {
		if (!ready) {
			return;
		}

		if (!navigator.serviceWorker.controller) {
			console.log('sw: not sending(!controller)');
			return;
		}

		navigator.serviceWorker.controller.postMessage({
			type: 'SET_WALLETS',
			wallets: wallets.map((w) => w.address),
		});
	}, [ready, wallets, hasController]);

	useEffect(() => {
		if (!navigator.serviceWorker.controller) {
			return;
		}

		navigator.serviceWorker.controller.postMessage({
			type: 'SET_URL',
			url: NOTIFICATIONS_URL,
		});
	}, [hasController]);

	if (!isVisible) {
		return (
			<div className="flex flex-col w-screen h-screen justify-center items-center">
				<h1 className="text-2xl font-semibold">PWA is available only on mobile devices</h1>
			</div>
		);
	}

	return (
		<SidebarProvider defaultOpen className="flex flex-row max-w-(--breakpoint-2xl) mx-auto relative overflow-x-hidden">
			<CustomSidebar />
			<Header />
			<main className="py-16 flex flex-col flex-1">
				<Outlet />
			</main>
			<Navigation />
		</SidebarProvider>
	);
}

export default Root;
