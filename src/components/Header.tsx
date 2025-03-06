import Switcher from './Switcher';
import Wallet from './Wallet';

function Header() {
  return (
    <div className="flex justify-between items-center h-16 gap-4 p-4 border border-border fixed top-0 left-0 w-screen z-[10] bg-background">
      <Switcher />
      <Wallet />
    </div>
  );
}

export default Header;
