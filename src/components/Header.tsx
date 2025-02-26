import Switcher from './Switcher';
import Wallet from './Wallet';

function Header() {
  return (
    <div className="flex justify-between items-center h-16 gap-4 p-4 border border-border ">
      <Switcher />
      <Wallet />
    </div>
  );
}

export default Header;
