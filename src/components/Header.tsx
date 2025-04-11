import { useSidebar } from '@betfinio/components';
import { MenuIcon } from 'lucide-react';
import { useCallback } from 'react';
import Switcher from './Switcher';
import Wallet from './Wallet';

function Header() {
	const { toggleSidebar } = useSidebar();
	const handleSidebar = useCallback(() => {
		toggleSidebar();
	}, [toggleSidebar]);
	return (
		<div className="flex justify-between items-center h-16 gap-4 p-4 border border-border w-full bg-background rounded-md">
			<MenuIcon className="size-6 cursor-pointer" onClick={handleSidebar} />
			<Switcher />
			<Wallet />
		</div>
	);
}

export default Header;
