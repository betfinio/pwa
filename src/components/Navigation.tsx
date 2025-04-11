import { useSidebar } from '@betfinio/components/ui';
import { Link } from '@tanstack/react-router';
import { BellIcon, Gamepad2Icon, Layers3Icon, MenuIcon, WalletIcon } from 'lucide-react';

function Navigation() {
	const { toggleSidebar } = useSidebar();

	return (
		<nav className="grid grid-cols-5 fixed w-screen bottom-0 left-0 border-t border-border p-2 pt-3 bg-background h-16 z-10">
			<div className="flex flex-col items-center justify-center text-xs cursor-pointer" onClick={toggleSidebar}>
				<MenuIcon className="w-6 h-6" />
				Menu
			</div>
			<Link to="/games/roulette" className="flex flex-col items-center justify-center text-xs">
				<Gamepad2Icon className="w-6 h-6" />
				Lobby
			</Link>
			<Link to="/staking" className="flex flex-col items-center justify-center text-xs ">
				<Layers3Icon className="w-6 h-6" />
				Staking
			</Link>
			<Link to="/notifications" className="flex flex-col items-center justify-center text-xs">
				<BellIcon className="w-6 h-6" />
				Notifications
			</Link>
			<Link to="/wallet" className="flex flex-col items-center justify-center text-xs">
				<WalletIcon className="w-6 h-6" />
				Wallet
			</Link>
		</nav>
	);
}

export default Navigation;
