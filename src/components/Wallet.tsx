import { Link } from '@tanstack/react-router';
import { CircleUserRoundIcon } from 'lucide-react';
import { useAccount } from 'wagmi';
import { truncateEthAddress, ZeroAddress } from '@betfinio/abi';
import { useEffect } from 'react';

function Wallet() {
  const { address = ZeroAddress } = useAccount();
  useEffect(() => {
    console.log('address', address);
  }, [address]);
  return (
    <Link to="/wallet" className="flex gap-2 items-center">
      <CircleUserRoundIcon className="w-8 h-8" />
      {truncateEthAddress(address)}
    </Link>
  );
}

export default Wallet;
