import { BetLogo } from '@betfinio/components/icons';

import { Button } from '@betfinio/components/ui';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { LoaderIcon } from 'lucide-react';
import ActionsSection from '../components/wallet/ActionsSection';
import BalanceSection from '../components/wallet/BalanceSection';
import ChangeWalletDrawer from '../components/wallet/ChangeWalletDrawer';
import CreateWalletDrawer from '../components/wallet/CreateWalletDrawer';
import ImportWalletDrawer from '../components/wallet/ImportWalletDrawer';
import LogoutDialog from '../components/wallet/LogoutDialog';
import ProfileLink from '../components/wallet/ProfileLink';

function WalletPage() {
	const { wallets, ready: walletsReady } = useWallets();
	const { ready, login, authenticated } = usePrivy();

	if (!ready || !walletsReady) {
		return (
			<div className="flex justify-center w-screen flex-row h-screen items-center">
				<LoaderIcon className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	const handleLogin = async () => {
		await login();
	};

	if (!authenticated) {
		return (
			<div className="flex flex-col gap-4 justify-evenly w-full h-screen items-center p-4">
				<div className="border border-primary rounded-full p-4">
					<BetLogo className="size-12" />
				</div>
				<Button onClick={handleLogin}>Login or sign up</Button>
			</div>
		);
	}
	if (wallets.length === 0) {
		return (
			<div className="flex flex-col gap-4  w-full h-screen items-center p-4">
				<h2 className="text-2xl font-semibold">Welcome to Betfin</h2>
				<div className="text-muted-foreground">Are you existing user?</div>
				<ImportWalletDrawer />
				<div className="text-muted-foreground">Are you new user?</div>
				<CreateWalletDrawer onClose={() => {}} />
				<LogoutDialog />
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-4 p-4">
			<ProfileLink />
			<BalanceSection />
			<ActionsSection />
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
