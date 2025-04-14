import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { Link } from '@tanstack/react-router';
import { UserCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useStoredAddress } from '../lib/query/wallet';
function Wallet() {
	const { address = ZeroAddress } = useAccount();
	const { wallets, ready } = useWallets();
	const { setActiveWallet } = useSetActiveWallet();
	const { data: storedAddress } = useStoredAddress();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!ready) return;
		setTimeout(() => {
			const wallet = wallets.find((w) => w.address === storedAddress);
			if (wallet) {
				setActiveWallet(wallet);
				setLoaded(true);
			}
		}, 500);
	}, [ready, storedAddress, wallets]);

	if (!loaded) return;

	return (
		<Link to="/wallet">
			<div className="flex flex-row gap-2 items-center border border-border bg-background-lighter p-2 px-4 pr-6 rounded-xl">
				<UserCircleIcon className="w-7 h-7 border border-primary rounded-full" />
				<div className="flex flex-col text-sm leading-none">
					<div className="text-foreground/50">{truncateEthAddress(address)}</div>
					<div className="text-success">username</div>
				</div>
			</div>
		</Link>
	);
}

export default Wallet;
