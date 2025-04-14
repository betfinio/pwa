import { useMediaQuery } from '@betfinio/components/hooks';
import { SidebarProvider } from '@betfinio/components/ui';
import { Outlet } from '@tanstack/react-router';
import CustomSidebar from '../components/CustomSidebar';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

function Root() {
	const { isMobile, isTablet } = useMediaQuery();
	const isVisible = isMobile || isTablet;

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
