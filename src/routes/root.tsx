import { useMediaQuery } from '@betfinio/components/hooks';
import { SidebarProvider } from '@betfinio/components/ui';
import { Outlet } from '@tanstack/react-router';
import CustomSidebar from '../components/CustomSidebar';
import Header from '../components/Header';

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
			<div className="flex flex-col flex-1">
				<Header />
				<main>
					<Outlet />
				</main>
			</div>
		</SidebarProvider>
	);
}

export default Root;
