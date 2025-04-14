import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@betfinio/components/ui';
import { usePrivy } from '@privy-io/react-auth';
import { LockIcon } from 'lucide-react';
import { motion } from 'motion/react';

function SecuritySection() {
	const { setWalletRecovery, linkPasskey, linkGoogle, linkEmail } = usePrivy();
	const handleSetWalletRecovery = () => {
		setWalletRecovery();
	};
	const handleLinkPasskey = () => {
		linkPasskey();
	};
	const handleLinkGoogle = () => {
		linkGoogle();
	};

	const handleLinkEmail = () => {
		linkEmail();
	};
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<motion.div
					whileTap={{ scale: 0.97 }}
					className="flex flex-row gap-2 w-full justify-start items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
				>
					<LockIcon className="size-6 text-primary" />
					<div className="font-semibold">Security</div>
				</motion.div>
			</DrawerTrigger>
			<DrawerContent className="p-4 min-h-[50vh]">
				<DrawerHeader>
					<DrawerTitle className="text-center">Security</DrawerTitle>
				</DrawerHeader>
				<div className="flex flex-col gap-4">
					<div>Authentication</div>
					<div className="flex flex-row gap-2 w-full justify-center">
						<Button onClick={handleSetWalletRecovery}>Set or change Password</Button>
					</div>
					<div>Backup</div>
					<div className="flex flex-row gap-2 w-full justify-center">
						<Button onClick={handleLinkPasskey}>Set or change Passkey</Button>
					</div>
					<div>Socials</div>
					<div className="flex flex-col gap-2 w-full justify-center">
						<Button onClick={handleLinkGoogle}>Link Google</Button>
						<Button onClick={handleLinkEmail}>Link Email</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default SecuritySection;
