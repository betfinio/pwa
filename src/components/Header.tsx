import Switcher from './Switcher';
import Wallet from './Wallet';

function Header() {
	return (
		<div className="flex justify-between items-center fixed top-0 left-0 h-16 gap-4 p-4 z-50 border-b border-border w-full bg-background">
			<Switcher />
			<Wallet />
		</div>
	);
}

export default Header;
