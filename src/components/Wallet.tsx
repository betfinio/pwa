import { ZeroAddress, truncateEthAddress } from '@betfinio/abi';
import { useWallets } from '@privy-io/react-auth';
import { Link } from '@tanstack/react-router';
import { UserCircleIcon } from 'lucide-react';
import { useEffect } from 'react';
import { polygon, polygonAmoy } from 'viem/chains';
import { useAccount, useConnect, useConnections } from 'wagmi';
import { mfQueryClient } from '../config/query';
import { useContextManifest } from '../lib/query/mf';

function Wallet() {
	const { address = ZeroAddress } = useAccount();

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
