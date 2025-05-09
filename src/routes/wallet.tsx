import { BetfinLogo, Fox } from '@betfinio/components/icons';
import { Button } from '@betfinio/components/ui';
import { useActiveWallet, useLogin, usePrivy, useWallets } from '@privy-io/react-auth';
import { IdCardIcon, LoaderIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import ActionsSection from '../components/wallet/ActionsSection';
import BalanceSection from '../components/wallet/BalanceSection';
import ChangeWalletDrawer from '../components/wallet/ChangeWalletDrawer';
import LogoutDialog from '../components/wallet/LogoutDialog';
import PassKeyDrawer from '../components/wallet/PassKeyDrawer';
import ProfileLink from '../components/wallet/ProfileLink';
import SecuritySection from '../components/wallet/SecuritySection';

function WalletPage() {
	const { wallets, ready: walletsReady } = useWallets();
	const { setActiveWallet } = useActiveWallet();
	const { ready, authenticated, connectWallet } = usePrivy();
	const { address } = useAccount();

	const { login } = useLogin();

	useEffect(() => {
		if (walletsReady && !address && ready) {
			if (wallets.length > 0) {
				setActiveWallet(wallets[0]);
			}
		}
	}, [address, wallets, walletsReady, ready, setActiveWallet]);

	if (!ready || !walletsReady) {
		return (
			<div className="flex justify-center w-full flex-row h-full items-center">
				<LoaderIcon className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	const handleLogin = async () => {
		connectWallet();
	};
	const handleSocials = () => {
		login({ loginMethods: ['email', 'google'] });
	};

	if (!authenticated && !address) {
		return (
			<div className="flex flex-col gap-4 justify-between w-full h-full items-center p-4 relative max-w-md mx-auto">
				<div className=" h-full flex flex-col justify-start py-20 items-center w-full">
					<BetfinLogo className="size-40 z-1" />
					<div className="bg-violet-900/50 size-[500px] rounded-full blur-3xl top-0 z-0 absolute" />
					<div className="bg-violet-900 size-[300px] rounded-full blur-3xl top-0 z-0 absolute" />
				</div>
				<PassKeyDrawer />
				<div className="flex flex-row w-full gap-2 relative z-10">
					<Button onClick={handleLogin} variant={'outline'} className="w-full gap-2">
						<Fox className="w-4 " />
						Connect wallet
					</Button>
					<Button onClick={handleSocials} variant={'outline'} className="w-full gap-2">
						<IdCardIcon className="w-4" />
						Log in with socials
					</Button>
				</div>
			</div>
		);
	}

	if (wallets.length === 0) {
		return (
			<div className="flex flex-col gap-4 w-full h-full items-center p-4 justify-between">
				<LoaderIcon className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 p-4 md:w-[500px] mx-auto">
			{address && <ProfileLink />}
			{address && <BalanceSection />}
			{address && <ActionsSection />}
			{address && <SecuritySection />}
			<AuthSection />
		</div>
	);
}

function AuthSection() {
	return (
		<div className="flex flex-col gap-4 justify-center w-full h-full items-center">
			<ChangeWalletDrawer />
			<LogoutDialog />
		</div>
	);
}

export default WalletPage;
