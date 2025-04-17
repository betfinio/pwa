import { ZeroAddress } from '@betfinio/abi';
import { SidebarProvider } from '@betfinio/components';
import { useMediaQuery } from '@betfinio/components/hooks';
import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Address } from 'viem';
import { polygon, polygonAmoy } from 'viem/chains';
import { useAccount } from 'wagmi';
import CustomSidebar from '../components/CustomSidebar';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Loading from '../components/pages/Loading';
import { mfQueryClient } from '../config/query';
import { NOTIFICATIONS_URL } from '../globals';
import { useContextManifest } from '../lib/query/mf';
import { useStoredAddress } from '../lib/query/wallet';

function Root() {
	const { isMobile, isTablet } = useMediaQuery();
	const isVisible = isMobile || isTablet;
	const { wallets, ready } = useWallets();
	const { address, status } = useAccount();
	const { data: storedAddress, updateAddress } = useStoredAddress();
	const [hasController, setHasController] = useState<boolean>(!!navigator.serviceWorker.controller);
	const { data: manifest } = useContextManifest(mfQueryClient);
	const { setActiveWallet } = useSetActiveWallet();
	const [initialized, setInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (status === 'disconnected' && !address) {
			setInitialized(true);
		}
	}, [status, address]);

	useEffect(() => {
		if (!ready) return;
		if (storedAddress === ZeroAddress) {
			setInitialized(true);
		}

		const wallet = wallets.find((w) => w.address === storedAddress);
		if (wallet) {
			setActiveWallet(wallet);
			updateAddress(wallet.address as Address);
		}
	}, [ready, wallets, address, storedAddress]);

	useEffect(() => {
		if (address?.toLowerCase() === storedAddress?.toLowerCase()) {
			setInitialized(true);
		}
	}, [address, storedAddress]);

	useEffect(() => {
		if (!manifest) return;
		if (!ready) return;
		if (address === ZeroAddress) return;
		const wallet = wallets.find((w) => w.address === address);
		if (wallet) {
			wallet.switchChain(manifest.environment === 'production' ? polygon.id : polygonAmoy.id);
		}
	}, [manifest, ready, wallets, address]);

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
	console.log('initialized', initialized);
	if (!initialized) return <Loading />;

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
