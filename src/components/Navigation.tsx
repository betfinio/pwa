import { Link } from '@tanstack/react-router';
import {
  BellIcon,
  Gamepad2Icon,
  HouseIcon,
  Layers3Icon,
  WalletIcon,
} from 'lucide-react';

function Navigation() {
  return (
    <nav className="grid grid-cols-5 fixed w-screen bottom-0 left-0 border-t border-border p-2 pt-3 bg-background h-16 z-10">
      <Link
        to="/home"
        className="flex flex-col items-center justify-center text-xs"
      >
        <HouseIcon className="w-6 h-6" />
        Home
      </Link>
      <Link
        to="/games/roulette"
        className="flex flex-col items-center justify-center text-xs"
      >
        <Gamepad2Icon className="w-6 h-6" />
        Lobby
      </Link>
      <Link
        to="/staking"
        className="flex flex-col items-center justify-center text-xs "
      >
        <Layers3Icon className="w-6 h-6" />
        Staking
      </Link>
      <Link
        to="/notifications"
        className="flex flex-col items-center justify-center text-xs"
      >
        <BellIcon className="w-6 h-6" />
        Notifications
      </Link>
      <Link
        to="/wallet"
        className="flex flex-col items-center justify-center text-xs"
      >
        <WalletIcon className="w-6 h-6" />
        Wallet
      </Link>
    </nav>
  );
}

export default Navigation;
