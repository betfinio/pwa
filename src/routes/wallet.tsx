import { BetfinLogo, Fox } from '@betfinio/components/icons';
import { Button } from '@betfinio/components/ui';
import { useConnectWallet, useLogin, usePrivy, useWallets } from '@privy-io/react-auth';
import { FingerprintIcon, IdCardIcon, LoaderIcon } from 'lucide-react';
import ActionsSection from '../components/wallet/ActionsSection';
import BalanceSection from '../components/wallet/BalanceSection';
import ChangeWalletDrawer from '../components/wallet/ChangeWalletDrawer';
import LogoutDialog from '../components/wallet/LogoutDialog';
import PassKeyDrawer from '../components/wallet/PassKeyDrawer';
import ProfileLink from '../components/wallet/ProfileLink';
import SecuritySection from '../components/wallet/SecuritySection';

function WalletPage() {
	const { wallets, ready: walletsReady } = useWallets();
	const { ready, authenticated, createWallet } = usePrivy();

	const { login } = useLogin({
		onComplete: () => {
			if (wallets.length === 0) {
				createWallet();
			}
		},
	});

	if (!ready || !walletsReady) {
		return (
			<div className="flex justify-center w-screen flex-row h-screen items-center">
				<LoaderIcon className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	const handleLogin = async () => {
		login({ loginMethods: ['wallet'] });
	};
	const handleSocials = () => {
		login({ loginMethods: ['email', 'google'] });
	};

	if (!authenticated) {
		return (
			<div className="flex flex-col gap-4 justify-between w-full h-full items-center p-4">
				<div className="relative h-full flex flex-col justify-start py-20 items-center w-full">
					<BetfinLogo className="size-40 z-1" />
					<div className="bg-violet-900/50 size-[500px] rounded-full blur-3xl z-0 absolute" />
					<div className="bg-violet-900 size-[300px] rounded-full blur-3xl z-0 absolute" />
				</div>
				<PassKeyDrawer />
				<div className="flex flex-row w-full gap-2">
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
		<div className="flex flex-col gap-4 p-4">
			<ProfileLink />
			<BalanceSection />
			<ActionsSection />
			<SecuritySection />
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
