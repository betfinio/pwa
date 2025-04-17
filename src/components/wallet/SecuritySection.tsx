import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@betfinio/components/ui';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { usePrivy } from '@privy-io/react-auth';
import { FingerprintIcon, KeyIcon, LockIcon, LogOutIcon, MailIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

function SecuritySection() {
	const { setWalletRecovery, linkPasskey, linkGoogle, linkEmail, unlinkGoogle, unlinkEmail, user } = usePrivy();
	const [open, setOpen] = useState(false);
	const [unlinkGoogleDialogOpen, setUnlinkGoogleDialogOpen] = useState(false);
	const [unlinkEmailDialogOpen, setUnlinkEmailDialogOpen] = useState(false);

	const handleSetWalletRecovery = () => {
		setOpen(false);
		setWalletRecovery();
	};

	const linkedEmail = user?.email?.address ?? undefined;
	const linkedGoogle = user?.google?.email ?? undefined;

	const handleLinkPasskey = () => {
		setOpen(false);
		linkPasskey();
	};
	const handleLinkGoogle = () => {
		setOpen(false);
		if (user?.google?.subject) {
			setUnlinkGoogleDialogOpen(true);
		} else {
			linkGoogle();
		}
	};

	const handleLinkEmail = async () => {
		setOpen(false);
		if (user?.email?.address) {
			setUnlinkEmailDialogOpen(true);
		} else {
			linkEmail();
		}
	};

	const handleUnlinkGoogle = async () => {
		if (!user?.google?.subject) return;
		await unlinkGoogle(user.google.subject);
		setUnlinkGoogleDialogOpen(false);
	};

	const handleUnlinkEmail = async () => {
		if (!user?.email?.address) return;
		await unlinkEmail(user.email.address);
		setUnlinkEmailDialogOpen(false);
	};

	return (
		<>
			<Drawer open={open} onOpenChange={setOpen}>
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
						<DrawerTitle className="text-center" asChild>
							<div className="flex flex-row gap-2 items-center w-full justify-center !text-xl">
								<LockIcon className="size-4" />
								Security
							</div>
						</DrawerTitle>
					</DrawerHeader>
					<div className="flex flex-col gap-4">
						<div className="text-muted-foreground">Authentication</div>
						<div className="flex flex-row gap-2 w-full justify-center">
							<Button onClick={handleSetWalletRecovery} className="w-full gap-2 rounded-xl" variant="outline">
								<KeyIcon className="size-4" />
								Set or change Password
							</Button>
						</div>
						<div className="text-muted-foreground">Backup</div>
						<div className="flex flex-row gap-2 w-full justify-center">
							<Button onClick={handleLinkPasskey} className="w-full gap-2 rounded-xl" variant="outline">
								<FingerprintIcon className="size-4" />
								Set or change Passkey
							</Button>
						</div>
						<div className="text-muted-foreground">Socials</div>
						<div className="flex flex-col gap-2 w-full justify-center">
							<Button onClick={handleLinkGoogle} className="w-full gap-2 rounded-xl" variant="outline">
								<SiGoogle className="size-4" />
								{linkedGoogle ? linkedGoogle : 'Link Google'}
							</Button>
							<Button onClick={handleLinkEmail} className="w-full gap-2 rounded-xl" variant="outline">
								<MailIcon className="size-4" />
								{linkedEmail ? linkedEmail : 'Link email'}
							</Button>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
			<Dialog open={unlinkGoogleDialogOpen} onOpenChange={setUnlinkGoogleDialogOpen}>
				<DialogContent className="p-4 w-[90vw]">
					<DialogHeader>
						<DialogTitle>Unlink Google</DialogTitle>
					</DialogHeader>
					<DialogDescription>Are you sure you want to unlink your Google account?</DialogDescription>
					<DialogFooter>
						<Button onClick={handleUnlinkGoogle} className="w-full gap-2 rounded-xl" variant="destructive">
							<LogOutIcon className="size-4" />
							Unlink {linkedGoogle}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog open={unlinkEmailDialogOpen} onOpenChange={setUnlinkEmailDialogOpen}>
				<DialogContent className="p-4 w-[90vw]">
					<DialogHeader>
						<DialogTitle>Unlink Email</DialogTitle>
					</DialogHeader>
					<DialogDescription>Are you sure you want to unlink your email?</DialogDescription>
					<DialogFooter>
						<Button onClick={handleUnlinkEmail} className="w-full gap-2 rounded-xl" variant="destructive">
							<LogOutIcon className="size-4" />
							Unlink {linkedEmail}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default SecuritySection;
