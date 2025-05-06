import { useMediaQuery } from '@betfinio/components/hooks';
import { useSidebar } from '@betfinio/components/ui';
import { Link, useLocation } from '@tanstack/react-router';
import { BellIcon, Gamepad2Icon, Layers3Icon, MenuIcon, WalletIcon } from 'lucide-react';

function Navigation() {
	const { toggleSidebar } = useSidebar();
	const { isMobile, isTablet } = useMediaQuery();
	const isVisible = isMobile || isTablet;

	const { pathname } = useLocation();

	const isActive = (href: string) => {
		return pathname.includes(href);
	};

	if (!isVisible) return null;

	return (
		<nav className="grid grid-cols-5 fixed w-screen bottom-0 left-0 border-t border-border p-2 pt-3 bg-background h-16 z-10">
			<div className="flex flex-col items-center justify-center text-xs cursor-pointer" onClick={toggleSidebar}>
				<MenuIcon className="w-6 h-6" />
				Menu
			</div>
			<Link
				to="/app"
				data-active={isActive('/app')}
				className="flex flex-col items-center justify-center transition-all duration-300 text-xs data-[active=true]:text-primary data-[active=true]:scale-110"
			>
				<Gamepad2Icon className="w-6 h-6" />
				Lobby
			</Link>
			<Link
				to="/staking"
				data-active={isActive('/staking')}
				className="flex flex-col items-center justify-center transition-all duration-300 text-xs data-[active=true]:text-primary data-[active=true]:scale-110"
			>
				<Layers3Icon className="w-6 h-6" />
				Staking
			</Link>
			<Link
				to="/notifications"
				data-active={isActive('/notifications')}
				className="flex flex-col items-center justify-center transition-all duration-300 text-xs data-[active=true]:text-primary data-[active=true]:scale-110"
			>
				<BellIcon className="w-6 h-6" />
				Notifications
			</Link>
			<Link
				to="/wallet"
				data-active={isActive('/wallet')}
				className="flex flex-col items-center justify-center transition-all duration-300 text-xs data-[active=true]:text-primary data-[active=true]:scale-110"
			>
				<WalletIcon className="w-6 h-6" />
				Wallet
			</Link>
		</nav>
	);
}

export default Navigation;
