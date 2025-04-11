import Switcher from './Switcher';
import Wallet from './Wallet';

function Header() {
	return (
		<div className="flex justify-between items-center h-16 gap-4 p-4 border border-border w-full bg-background my-2 rounded-md">
			<Switcher />
			<Wallet />
		</div>
	);
}

export default Header;
