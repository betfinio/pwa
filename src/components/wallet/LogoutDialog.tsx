import { Button } from '@betfinio/components/ui';
import { DialogDescription, DialogFooter } from '@betfinio/components/ui';
import { DialogContent, DialogHeader, DialogTitle } from '@betfinio/components/ui';
import { DialogTrigger } from '@betfinio/components/ui';
import { Dialog } from '@betfinio/components/ui';
import { useLogout } from '@privy-io/react-auth';
import { LogOutIcon } from 'lucide-react';
import { motion } from 'motion/react';

function LogoutDialog() {
	const { logout } = useLogout();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.div
					whileTap={{ scale: 0.97 }}
					className="flex flex-row gap-2 w-full justify-start items-center border border-border rounded-xl p-4 bg-background-lighter cursor-pointer"
				>
					<LogOutIcon className="size-6 text-destructive" />
					<div className="font-semibold">Logout</div>
				</motion.div>
			</DialogTrigger>
			<DialogContent className="p-4 w-[90vw]">
				<DialogHeader>
					<DialogTitle className="text-center">Logout</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-center text-sm text-muted-foreground">Are you sure you want to logout?</DialogDescription>
				<DialogFooter>
					<motion.div whileTap={{ scale: 0.97 }} className="w-full flex justify-center">
						<Button variant="destructive" onClick={logout} className="gap-2 w-full">
							<LogOutIcon className="size-4" />
							Logout
						</Button>
					</motion.div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default LogoutDialog;
