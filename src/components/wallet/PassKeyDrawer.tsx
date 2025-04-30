import { Button, Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@betfinio/components/ui';
import { useActiveWallet, useLoginWithPasskey, useSignupWithPasskey } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import { useCreateWallet } from '@privy-io/react-auth';
import { FingerprintIcon, LoaderIcon, ScanFaceIcon } from 'lucide-react';

function PassKeyDrawer() {
	const { wallets } = useWallets();
	const { createWallet } = useCreateWallet();
	const { setActiveWallet } = useActiveWallet();
	const { loginWithPasskey, state: loginState } = useLoginWithPasskey();
	const { signupWithPasskey, state: signupState } = useSignupWithPasskey({
		onComplete: async () => {
			if (wallets.length === 0) {
				const wallet = await createWallet();
				const connectedWallet = wallets.find((w) => w.address === wallet.address);
				if (connectedWallet) {
					setActiveWallet(connectedWallet);
				} else {
					window.location.reload();
				}
			}
		},
	});
	const handleCreateAccount = () => {
		signupWithPasskey();
	};
	const handleLogin = () => {
		loginWithPasskey();
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className="gap-2 w-full">
					<FingerprintIcon className="size-4" />
					Login or sign up with passkey
				</Button>
			</DrawerTrigger>
			<DrawerContent className="p-4">
				<DrawerHeader>
					<DrawerTitle>Login or sign up</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription asChild className="text-foreground text-base">
					<div className="flex flex-col items-center gap-4">
						<div className="flex flex-row items-center justify-center gap-2">
							<ScanFaceIcon className="size-20 text-primary" />
							<FingerprintIcon className="size-20 text-primary" />
						</div>
						<div className="text-center  text-sm text-muted-foreground">
							Create a new account with a passkey or use a passkey to log in to an existing account
						</div>
						<Button className="w-full gap-2 rounded-xl" onClick={handleCreateAccount} disabled={signupState.status === 'awaiting-passkey'}>
							{signupState.status === 'awaiting-passkey' && <LoaderIcon className="size-4 animate-spin" />}
							Create new account
						</Button>
						<Button variant="outline" className="w-full gap-2 rounded-xl" onClick={handleLogin} disabled={loginState.status === 'awaiting-passkey'}>
							{loginState.status === 'awaiting-passkey' && <LoaderIcon className="size-4 animate-spin" />}
							Log in with passkey
						</Button>
					</div>
				</DrawerDescription>
			</DrawerContent>
		</Drawer>
	);
}

export default PassKeyDrawer;
